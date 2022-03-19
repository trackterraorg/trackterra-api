import { IParsedTx, IParser, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { TransferEngine } from './transfer';

export abstract class Reward {}

export class AnchorClaimRewards implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    let allTransferActions = args.contractActions?.transfer.filter((tA) => {
      return (tA.to as unknown as string) == args.walletAddress;
    });

    const contractActions = {
      transfer: allTransferActions,
    };

    let actions = new TransferEngine().process({ ...args, contractActions });

    let unbondActions = args.contractActions?.unbond;

    actions = actions.reverse();

    unbondActions?.forEach((action) => {
      for (let index = 0; index < actions.length; index++) {
        const tA = actions[index];

        if (
          tA.sender === (action.owner as unknown as string) &&
          tA.receivedAmount == (action.amount as unknown as string)
        ) {
          tA.tag = TxTag.PoolWithdrawal;
          actions[index] = tA;
        }
      }
    });

    return actions;
  }
}

export class AnchorClaimBAssetRewards implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    args.transferActions = args.transferActions.map((tA) => {
      tA.recipient = args.walletAddress;
      return tA;
    });

    return new TransferEngine().process(args);
  }
}

export const Rewarders = {
  AnchorClaimRewards,
  AnchorClaimBAssetRewards,
};
