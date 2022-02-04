import { Event as TxEvent, TxLog } from '@terra-money/terra.js';
import _ = require('lodash');
import {
  UnableToExtractActionException,
  UnableToIdentifyTxTypeException,
} from '../exceptions';
import { ProtocolType } from '../loader/protocol.interface';
import { IAmount } from '../parser';
import { findAttributes, separateAmountFromToken } from '../utils/helpers';
import { TransferAction, TransformedData } from './transformer.interfaces';
import { splitTokens } from '../utils';
export class EventTransformer {
  private _txLog: TxLog | undefined;
  private _actionKeys: string[] | undefined = [];
  private _txProtocol?: ProtocolType;
  private _contractActions: any = [];
  private _transferActions: TransferAction[] | undefined = [];

  public transform(txLog: TxLog): this {
    this.setTxLog(txLog).setActionKeys().determineTxProtocol().doTransform();
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
    if (this._actionKeys?.includes('from_contract')) {
      this._txProtocol = ProtocolType.Contract;
      return this;
    }

    const isNative =
      _.intersection(this._actionKeys, [
        'transfer',
        'delegate',
        'withdraw_rewards',
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

    this.transformTransferActions();

    if (this._txProtocol === ProtocolType.Native) {
      this.transformNativeDelegate();
      this.transformNativeReward();
    }

    return this;
  }

  public getEvents(): TxEvent[] | undefined {
    return this._txLog?.events;
  }

  private transformContractActions(): this {
    const attributes = findAttributes(this._txLog?.events, 'from_contract');

    if (!attributes) {
      throw new UnableToExtractActionException('from_contract');
    }

    const contractActions: any = {};
    let contract = '';

    for (let i = 0; i < attributes.length; i += 1) {
      const attr = attributes[i];
      if (attr.key === 'contract_address') {
        contract = attr.value;
        continue;
      }

      if (attr.key === 'action') {
        const action = attr.value;
        const values: any = { contract };

        for (i = i + 1; i < attributes.length; i += 1) {
          const attr = attributes[i];

          if (attr.key === 'contract_address' || attr.key === 'action') {
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
        tR.amount = separateAmountFromToken(attr.value);
        transfers.push(tR as TransferAction);
        tR = {};
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

    const amount = attributes.find((attr) => {
      return attr.key == 'amount';
    });

    const transfer: TransferAction = {
      sender: undefined,
      recipient: validator.value,
      amount: {
        token: 'uluna',
        amount: amount.value,
      },
      extraParsingInfo: 'NativeDelegate',
    };

    this._transferActions = [transfer];
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
        amount: {
          token: amount.token,
          amount: amount.amount,
        },
        extraParsingInfo: 'NativeReward',
      };

      this._transferActions.push(transfer);
    }

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
  public getActions(): TransformedData {
    return {
      type: this.getTxType(),
      contractActions: this._contractActions,
      transferActions: this._transferActions,
    };
  }
}
