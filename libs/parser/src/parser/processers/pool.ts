import { TxLabel } from '../parser.enums';
import { ParserProcessArgs } from '../args';
import { IAmount, IParsedTx, IParser } from '../parser.interfaces';
import { TxTag } from '..';
import { TransferEngine } from './transfer';
import _ = require('lodash');

export class PoolTransferEngine {
  static findTxs(args: ParserProcessArgs, key: string) {
    const transferActions = args.contractActions.transfer.filter((tA: any) => {
      return tA[key] === args.walletAddress;
    });

    if (_.size(transferActions) > 0) {
      return transferActions;
    }

    const sendActions = args.contractActions.send.filter((tA: any) => {
      return tA[key] === args.walletAddress;
    });

    if (_.size(sendActions) > 0) {
      return sendActions;
    }
  }

  static poolDeposit(args: ParserProcessArgs) {
    return this.findTxs(args, 'from');
  }

  static poolWithdraw(args: ParserProcessArgs) {
    return this.findTxs(args, 'to');
  }

  static process(args: ParserProcessArgs): IParsedTx[] {
    let contractActions = args.contractActions;
    const contractKeys = Object.keys(contractActions);

    let actions: any;

    if (contractKeys.includes('bond')) {
      actions = this.poolDeposit(args);
    } else if (contractKeys.includes('unbond')) {
      actions = this.poolWithdraw(args);
    } else {
      return [];
    }

    if (!actions || _.size(actions) === 0) {
      return [];
    }

    contractActions = {
      transfer: actions,
    };

    return new TransferEngine().process({
      ...args,
      contractActions,
      transferActions: undefined,
    });
  }
}

export class GenericPoolTransfer implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    return PoolTransferEngine.process(args);
  }
}

export const PoolTransfers = {
  GenericPoolTransfer,
};
