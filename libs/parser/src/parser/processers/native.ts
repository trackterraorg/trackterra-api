import { separateAmountFromToken } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IParsedTx, IParser, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { ISwapAction } from '../parser.interfaces';
import { SwapEngine } from './swap';
import { TransferEngine } from './transfer';

export class NativeGovVote implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const { walletAddress, txType } = args;

    return [
      {
        walletAddress,
        label: TxLabel.Fee,
        tag: txType.tag,
        sender: walletAddress,
        friendlyDescription: txType?.description ?? '',
      },
    ];
  }
}

export class NativeDelegate implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const transferActions = args.transferActions.map((tA: any) => {
      if (tA.sender === 'wallet_address') {
        tA.sender = args.walletAddress;
      }

      if (tA.recipient === 'wallet_address') {
        tA.recipient = args.walletAddress;
      }

      return tA;
    });

    return new TransferEngine().process({
      ...args,
      transferActions,
    });
  }
}

export class NativeUnDelegate implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const transferActions = args.transferActions.map((tA: any) => {
      if (tA.sender === 'wallet_address') {
        tA.sender = args.walletAddress;
      }

      if (tA.recipient === 'wallet_address') {
        tA.recipient = args.walletAddress;
      }

      return tA;
    });

    return new TransferEngine().process({
      ...args,
      transferActions,
    });
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
        friendlyDescription: txType?.description ?? '',
      };
    });
  }
}

export class NativeSendRecieveSwap implements IParser {
  parseNativeSwap(args: ParserProcessArgs): IParsedTx[] {
    // get first tx that belongs to wallet address
    const sendAction = args.transferActions.find((tA: any) => {
      return tA.sender === args.walletAddress;
    });

    // get last deposit action
    const depositAction = args.transferActions.find((tA: any) => {
      return tA.recipient === args.walletAddress;
    });

    const swapAction: any = {
      contract: '',
      sender: args.walletAddress,
      receiver: args.walletAddress,
      offer_asset: sendAction.amount.token,
      ask_asset: depositAction.amount.token,
      offer_amount: sendAction.amount.amount,
      return_amount: depositAction.amount.amount,
    };

    return SwapEngine.swap({
      ...args,
      contractActions: {
        swap: [swapAction],
      },
      transferActions: undefined,
      txType: {
        ...args.txType,
        description: 'Native swap',
      },
    });
  }

  process(args: ParserProcessArgs): IParsedTx[] {
    const { contractActions } = args;

    if (Object.keys(contractActions).includes('native_swap')) {
      return this.parseNativeSwap(args);
    }

    return new TransferEngine().process(args);
  }
}

export const Native = {
  NativeSendRecieveSwap,
  NativeGovVote,
  NativeDelegate,
  NativeUnDelegate,
  NativeReward,
};
