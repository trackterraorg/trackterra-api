import _ = require('lodash');
import { IParser, IParsedTx } from '..';
import { ParserProcessArgs } from '../args';
import { TransferEngine } from './transfer';

export class BETHBridgeDeposit implements IParser {

  process(args: ParserProcessArgs): IParsedTx[] {

    const { walletAddress, contractActions } = args;

    const nativeTransfer = args.allEvents.find((actions: any) => {
      return actions.type === 'Native';
    })

    if(! nativeTransfer) {
      throw 'It is not a bEth bridge deposit tx';
    }

    const transferActions = args.contractActions.mint.filter((cA: any) => {
      return cA.to === walletAddress;
    }).map((cA: any) => {
      return {
        sender: cA.contract,
        recipient: walletAddress,
        amount: {
          amount: cA.amount,
          token: cA.contract,
        }
      }
    });

    return (new TransferEngine()).process({
      ...args,
      contractActions: undefined,
      transferActions
    });
  };  
}

export const AnchorProtocol = {
  BETHBridgeDeposit,
};
