import { separateAmountFromToken } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IAmount, IParsedTx, IParser, ISwapAction, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { MintEngine } from './mint';
import { SwapEngine } from './swap';
import { ITransferRecord, TransferEngine } from './transfer';

export class LuartStakingReward implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const { walletAddress, contractActions } = args;

    const withdrawTx = new TransferEngine().process({
      ...args,
      contractActions: undefined,
    });

    const stakingRewardTx = new TransferEngine().process({
      ...args,
      contractActions: _.pick(args.contractActions, 'transfer'),
      transferActions: undefined,
      txType: {
        ...args.txType,
        tag: TxTag.StakingRewards,
      },
    });

    return withdrawTx.concat(stakingRewardTx);
  }
}

export const LuartProtocol = {
  LuartStakingReward,
};
