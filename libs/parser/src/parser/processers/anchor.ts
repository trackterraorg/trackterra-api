import _ = require('lodash');
import { IParser, IParsedTx } from '..';
import { ParserProcessArgs } from '../args';
import { TransferEngine } from './transfer';

export class BETHDeposit implements IParser {

  process(args: ParserProcessArgs): IParsedTx[] {

    const { walletAddress, contractActions } = args;

    const nativeTransfer = args.allEvents.find((actions: any) => {
      return actions.type === 'Native';
    })

    if(nativeTransfer) {
      args.txType.description = 'bEth bridge deposit';
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
  BETHDeposit,
};
