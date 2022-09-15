import { TxLabel } from '../parser.enums';
import { ParserProcessArgs } from '../args';
import { IAmount, IParsedTx, IParser } from '../parser.interfaces';
import { TxTag } from '..';

export interface ITransferRecord {
  contract: string | undefined;
  sender: string;
  recipient: string;
  amount: IAmount;
}

export class TransferEngine {
  private _preferredKey: string | undefined;

  public get preferredKey(): string | undefined {
    return this._preferredKey;
  }

  public set preferredKey(value: string | undefined) {
    this._preferredKey = value;
  }

  public readonly transferKeys = ['transfer', 'send'];

  keySelector(keys: string[]): string | undefined {
    const keysInOrder = this.transferKeys;

    const key = keysInOrder.find((k) => keys.includes(k));

    return key;
  }

  mapContractActions({
    contractActions,
  }: ParserProcessArgs): ITransferRecord[] | undefined {
    if (contractActions === undefined) {
      return undefined;
    }

    const mappedActions: ITransferRecord[] = [];

    const key =
      this.preferredKey ?? this.keySelector(Object.keys(contractActions));

    // Avoid internal events
    if (key === undefined) {
      return mappedActions;
    }

    contractActions[key].forEach((action: any) => {
      mappedActions.push({
        contract: action.contract,
        recipient: action.to,
        sender: action.from,
        amount: {
          amount: action.amount,
          token: action.contract,
        },
      });
    });

    return mappedActions;
  }

  process(args: ParserProcessArgs): IParsedTx[] {
    const { txType, walletAddress } = args;
    let transferActions = args.transferActions;

    if (
      transferActions === undefined ||
      transferActions.length === 0 ||
      this.preferredKey
    ) {
      transferActions = this.mapContractActions(args);
    }

    const result: IParsedTx[] = [];

    transferActions?.forEach((transferAction: any) => {
      if (transferAction.recipient == walletAddress) {
        result.push({
          walletAddress,
          contract: transferAction?.contract ?? txType.contract ?? '',
          label: TxLabel.Deposit,
          tag: txType.tag ?? TxTag.Deposit,
          sender: transferAction.sender,
          recipient: transferAction.recipient,
          receivedAmount: transferAction.amount.amount,
          receivedToken: transferAction.amount.token,
          friendlyDescription: txType?.description ?? '',
        });
      } else if (transferAction.sender == walletAddress) {
        result.push({
          walletAddress,
          contract: transferAction?.contract ?? txType.contract ?? '',
          label: TxLabel.Withdraw,
          tag: txType.tag ?? TxTag.Withdraw,
          sender: transferAction.sender,
          sentAmount: transferAction.amount.amount,
          sentToken: transferAction.amount.token,
          recipient: transferAction.recipient,
          friendlyDescription: txType?.description ?? '',
        });
      }
    });

    return result;
  }
}

/**
 * Extracted from transfer event
 */
export class GenericTransfer implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    return new TransferEngine().process(args);
  }
}

export class PylonPoolDeposit implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    //FIXME

    return new TransferEngine().process(args);
  }
}

/**
 * Extract from contract actions
 */
export const Transfers = {
  GenericTransfer,
  PylonPoolDeposit,
};
