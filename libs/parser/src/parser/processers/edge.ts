import _ = require('lodash');
import { IParsedTx, IParser, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { TransferEngine } from './transfer';


export class EdgeDepositCollateral implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const { walletAddress, contractActions } = args;

    const poolDepositActions = contractActions.transfer_from.map((cA: any) => {
      return {
        contract: cA.contract,
        sender: walletAddress,
        recipient: cA.to,
        amount: {
          amount: cA.amount,
          token: cA.contract,
        }
      }
    });

    const poolDepositTx = (new TransferEngine()).process({
      ...args,
      contractActions: undefined,
      transferActions: [_.first(poolDepositActions)],
      txType: {
        ...args.txType,
        tag: TxTag.PoolDeposit
      }
    });

    return poolDepositTx;
  }
}

export const EdgeProtocol = {
  EdgeDepositCollateral,
};
