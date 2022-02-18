import { IParsedTx, IParser, TxTag } from "..";
import { ParserProcessArgs } from "../args";
import { TransferEngine } from "./transfer";

export abstract class Reward {}

export class AnchorClaimRewards implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    
    let allTransferActions = args.contractActions?.transfer.filter((tA) => {
        return tA.to as unknown as string == args.walletAddress
    });

    let unbondActionsFromContract = args.contractActions?.unbond;

    const transferActions = [];
    const unbondActions = [];

    allTransferActions.forEach((transferAction) => {
        const unstakeTx = unbondActionsFromContract.find((uA) => {
            return transferAction.from === uA.owner && transferAction.amount === uA.amount;
        });

        if(unstakeTx) {
            unbondActions.push(transferAction);
        } else {
            transferActions.push(transferAction);
        }
    });

    args.contractActions = {
        transfer: unbondActions
    };
    args.txType.tag = TxTag.PoolWithdrawal;
    const unstakeActions = ((new TransferEngine()).process(args));

    args.contractActions = {
        transfer: transferActions
    };
    args.txType.tag = TxTag.StakingRewards;
    const rewards = (new TransferEngine()).process(args);

    return unstakeActions.concat(rewards);
  }
}

export class AnchorClaimBAssetRewards implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    
    args.transferActions = args.transferActions.map((tA) => {
        tA.recipient = args.walletAddress;
        return tA;
    });

    return (new TransferEngine()).process(args);
  }
}

export const Rewarders = {
  AnchorClaimRewards,
  AnchorClaimBAssetRewards,
};