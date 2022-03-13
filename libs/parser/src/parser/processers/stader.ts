import { separateAmountFromToken } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IAmount, IParsedTx, IParser, ISwapAction, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { MintEngine } from './mint';
import { SwapEngine } from './swap';
import { ITransferRecord, TransferEngine } from './transfer';

export class StaderSwap implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {

    const { walletAddress, contractActions, transferActions } = args;

    const sendAction: any = transferActions.find((cA: any) => {
      return cA.sender === walletAddress;
    });

    let recieveAction: any = contractActions.mint.find((cA: any) => {
      return cA.to === walletAddress;
    });

    const swapAction: any = {
      contract: sendAction.contract,
      sender: walletAddress,
      receiver: walletAddress,
      offer_asset: sendAction.amount.token,
      ask_asset: recieveAction.contract,
      offer_amount: sendAction.amount.amount,
      return_amount: recieveAction.amount,
    }
    
    return SwapEngine.swap({
      ...args,
      contractActions: {
        swap: [swapAction],
      },
      transferActions: undefined,
    });
  }
}

export class StaderClaimAirdrop implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {

    const { walletAddress, contractActions, transferActions } = args;

    const airdropAction: any = contractActions.transfer.filter((cA: any) => {
      return cA.to === walletAddress;
    }).map((cA: any) => {
      return {
        sender: cA.from,
        recipient: cA.to,
        amount: {
          amount: cA.amount,
          token: cA.contract,
        }
      }
    });

    const airdropTx = (new TransferEngine()).process({
      ...args,
      contractActions: undefined,
      transferActions: airdropAction,
    });

    const txType = args.txType;
    txType.tag = undefined;

    const sentTx = (new TransferEngine()).process({
      ...args,
      contractActions: undefined,
      transferActions,
      txType,
    });

    return airdropTx.concat(sentTx);
  }
}

export const StaderProtocol = {
  StaderSwap,
  StaderClaimAirdrop,
};
