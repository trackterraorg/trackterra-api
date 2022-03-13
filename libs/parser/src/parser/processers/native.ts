import { separateAmountFromToken } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IParsedTx, IParser, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { TransferEngine } from './transfer';

export class NativeGovVote implements IParser {

  process(args: ParserProcessArgs): IParsedTx[] {
    
    const { walletAddress, txType } = args;

    return [{
      walletAddress,
      label: TxLabel.Fee,
      tag: txType.tag,
      sender: walletAddress,
      friendlyDescription: txType.description,
    }];
  }
}

export class NativeDelegate implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    
    const transferActions = args.transferActions.map((tA: any) => {
      if(tA.sender === 'wallet_address') {
        tA.sender = args.walletAddress;
      }

      if(tA.recipient === 'wallet_address') {
        tA.recipient = args.walletAddress;
      }

      return tA;
    });

    return (new TransferEngine()).process({
      ...args,
      transferActions
    });
  }
}

export class NativeUnDelegate implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {

    const transferActions = args.transferActions.map((tA: any) => {
      if(tA.sender === 'wallet_address') {
        tA.sender = args.walletAddress;
      }

      if(tA.recipient === 'wallet_address') {
        tA.recipient = args.walletAddress;
      }

      return tA;
    });

    return (new TransferEngine()).process({
      ...args,
      transferActions
    })
  }
}

export class NativeReward implements IParser {
  process({
    walletAddress,
    txType,
    transferActions,
  }: ParserProcessArgs): IParsedTx[] {
    return transferActions.map((transferAction) => {
      const { sender, amount } = transferAction;
      return {
        walletAddress,
        label: TxLabel.Deposit,
        tag: txType.tag,
        sender,
        recipient: walletAddress,
        receivedAmount: amount.amount,
        receivedToken: amount.token,
        friendlyDescription: txType.description,
      };
    });
  }
}

export const Native = {
  NativeGovVote,
  NativeDelegate,
  NativeUnDelegate,
  NativeReward,
};
