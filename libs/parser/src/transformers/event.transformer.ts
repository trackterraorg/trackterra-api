import { Event as TxEvent, TxLog } from '@terra-money/terra.js';
import _ = require('lodash');
import {
  UnableToExtractActionException,
  UnableToIdentifyTxTypeException,
} from '../exceptions';
import { ProtocolType } from '../loader/protocol.interface';
import { IAmount } from '../parser';
import { findAttributes } from '../utils/helpers';
import { TransferAction, TransformedEvents } from './transformer.interfaces';
import { splitTokens } from '../utils';
export class EventTransformer {
  private _txLog: TxLog | undefined;
  private _actionKeys: string[] | undefined = [];
  private _txProtocol?: ProtocolType;
  private _contractActions: any = [];
  private _transferActions: TransferAction[] | undefined = [];

  public transform(txLog: TxLog): this {
    try {
      this.setTxLog(txLog).setActionKeys().determineTxProtocol().doTransform();
    } catch (e) {}
    return this;
  }

  private setTxLog(txLog: TxLog): this {
    this._txLog = txLog;
    return this;
  }

  private setActionKeys(): this {
    this._actionKeys = this._txLog?.events.map((ev) => {
      return ev.type;
    });

    return this;
  }

  private determineTxProtocol(): this {
    if (
      this._actionKeys?.includes('wasm') ||
      this._actionKeys?.includes('from_contract')
    ) {
      this._txProtocol = ProtocolType.Contract;
      return this;
    }

    const isNative =
      _.intersection(this._actionKeys, [
        'transfer',
        'delegate',
        'withdraw_rewards',
        'proposal_vote',
        'unbond',
        'swap',
      ]).length > 0;
    if (isNative) {
      this._txProtocol = ProtocolType.Native;
      return this;
    }

    throw new UnableToIdentifyTxTypeException();
  }

  private doTransform(): this {
    if (this._txProtocol === ProtocolType.Contract) {
      this.transformContractActions();
    }

    this.transformSwapActions();
    this.transformTransferActions();

    if (this._txProtocol === ProtocolType.Native) {
      this.transformNativeDelegate();
      this.transformNativeUnDelegate();
      this.transformNativeReward();
      this.transformProposalVote();
    }

    return this;
  }

  public getEvents(): TxEvent[] | undefined {
    return this._txLog?.events;
  }

  private transformContractActions(): this {
    const wasmAttributes = findAttributes(this._txLog?.events, 'wasm');
    const fromContractAttributes = findAttributes(
      this._txLog?.events,
      'from_contract',
    );

    if (!wasmAttributes && !fromContractAttributes) {
      throw new UnableToExtractActionException('wasm and from_contract');
    }

    const attributes = wasmAttributes ?? fromContractAttributes;

    const contractActions: any = {};
    let contract = '';

    for (let i = 0; i < attributes.length; i += 1) {
      const attr = attributes[i];
      if (attr.key === 'contract_address' || attr.key === '_contract_address') {
        contract = attr.value;
        continue;
      }

      if (attr.key === 'action') {
        const action = attr.value;
        const values: any = { contract };

        for (i = i + 1; i < attributes.length; i += 1) {
          const attr = attributes[i];

          if (
            attr.key === 'contract_address' ||
            attr.key === '_contract_address' ||
            attr.key === 'action'
          ) {
            i = i - 1;
            break;
          }

          values[attr.key] = attr.value;
        }

        contractActions[action] = contractActions[action] || [];
        contractActions[action].push(values);
      }
    }

    this._contractActions = contractActions;
    return this;
  }

  private transformSwapActions(): this {
    if (!this._actionKeys?.includes('swap')) {
      return this;
    }

    const attributes = findAttributes(this._txLog?.events, 'swap');

    if (!attributes) {
      throw new UnableToExtractActionException('swap');
    }

    const nativeSwaps: any = [];
    let tR: any;

    for (let i = 0; i < attributes.length; i += 5) {
      tR = {};
      for (let j = i; j < i + 5; j++) {
        const attr = attributes[j];
        tR[attr.key] = attr.value;
      }

      nativeSwaps.push(tR);
    }

    this._contractActions['native_swap'] = nativeSwaps;

    return this;
  }

  private transformTransferActions(): this {
    if (!this._actionKeys?.includes('transfer')) {
      return this;
    }

    const attributes = findAttributes(this._txLog?.events, 'transfer');

    if (!attributes) {
      throw new UnableToExtractActionException('transfer');
    }

    const transfers: TransferAction[] = [];

    let tR: any = {};

    attributes.forEach((attr) => {
      if (attr.key === 'amount') {
        const amounts: IAmount[] = splitTokens(attr.value);

        for (const amount of amounts) {
          transfers.push({ ...tR, amount } as TransferAction);
        }
      }
      tR[attr.key] = attr.value;
    });

    this._transferActions = transfers;
    return this;
  }

  private transformNativeDelegate(): this {
    if (!this._actionKeys?.includes('delegate')) {
      return this;
    }

    const attributes = findAttributes(this._txLog?.events, 'delegate');

    if (!attributes) {
      throw new UnableToExtractActionException('delegate');
    }

    const validator = attributes.find((attr) => {
      return attr.key == 'validator';
    });

    const strAmount = attributes.find((attr) => {
      return attr.key == 'amount';
    });

    const amounts: IAmount[] = splitTokens(strAmount.value);

    for (const amount of amounts) {
      if (_.isEmpty(amount.token)) {
        amount.token = 'uluna';
      }

      const transfer: TransferAction = {
        sender: 'wallet_address',
        recipient: validator.value,
        amount,
        extraParsingInfo: 'NativeDelegate',
      };

      this._transferActions.push(transfer);
    }
    return this;
  }

  private transformNativeUnDelegate(): this {
    if (!this._actionKeys?.includes('unbond')) {
      return this;
    }

    const attributes = findAttributes(this._txLog?.events, 'unbond');

    if (!attributes) {
      throw new UnableToExtractActionException('unbond');
    }

    const validator = attributes.find((attr) => {
      return attr.key == 'validator';
    });

    const strAmount = attributes.find((attr) => {
      return attr.key == 'amount';
    });

    const amounts: IAmount[] = splitTokens(strAmount.value);

    for (const amount of amounts) {
      if (_.isEmpty(amount.token)) {
        amount.token = 'uluna';
      }

      const transfer: TransferAction = {
        sender: validator.value,
        recipient: 'wallet_address',
        amount,
        extraParsingInfo: 'NativeUnDelegate',
      };

      this._transferActions.push(transfer);
    }
    return this;
  }

  private transformNativeReward(): this {
    if (!this._actionKeys?.includes('withdraw_rewards')) {
      return this;
    }

    const attributes = findAttributes(this._txLog?.events, 'withdraw_rewards');

    if (!attributes) {
      throw new UnableToExtractActionException('withdraw_rewards');
    }

    const validator = attributes.find((attr) => {
      return attr.key == 'validator';
    });

    const amountAttr = attributes.find((attr) => {
      return attr.key == 'amount';
    });

    const amounts: IAmount[] = splitTokens(amountAttr.value);

    this._transferActions = [];

    for (const amount of amounts) {
      const transfer: TransferAction = {
        recipient: undefined,
        sender: validator.value,
        amount,
        extraParsingInfo: 'NativeReward',
      };

      this._transferActions.push(transfer);
    }

    return this;
  }

  private transformProposalVote(): this {
    if (!this._actionKeys?.includes('proposal_vote')) {
      return this;
    }

    // const attributes = findAttributes(this._txLog?.events, 'message');

    // const sender= attributes.find((attr: any) => {
    //   return attr.key === 'sender';
    // });

    this._transferActions.push({
      recipient: undefined,
      sender: undefined,
      amount: undefined,
      extraParsingInfo: 'NativeGovVote',
    });

    return this;
  }

  isNative() {
    return this._txProtocol === ProtocolType.Native;
  }

  isContract() {
    return this._txProtocol === ProtocolType.Contract;
  }

  /**
   * Native or Contract tx
   */
  getTxType(): ProtocolType {
    if (this.isNative()) {
      return ProtocolType.Native;
    }

    if (this.isContract()) {
      return ProtocolType.Contract;
    }

    throw new UnableToIdentifyTxTypeException();
  }

  /**
   * Return the actions regardless it is native or contract actions
   */
  public getActions(): TransformedEvents {
    return {
      type: this.getTxType(),
      contractActions: this._contractActions,
      transferActions: this._transferActions,
    };
  }
}
