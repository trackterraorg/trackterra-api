import { separateAmountFromToken } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IAmount, IParsedTx, IParser, ISwapAction, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { LiquidityEngine } from './liquidity';
import { SwapEngine } from './swap';

export class ZapOut implements IParser {
  zapOutUnstake(args: ParserProcessArgs): IParsedTx {
    const { walletAddress, txType } = args;
    const action = _.first(args.contractActions.unstake);
    const contract = action.contract as unknown as string;
    const sentToken = action.asset_token as unknown as string;
    const sentAmount = action.amount as unknown as string;
    return {
      walletAddress,
      contract,
      label: TxLabel.Withdraw,
      tag: TxTag.PoolDeposit,
      sender: walletAddress,
      sentAmount,
      sentToken,
      friendlyDescription: txType.description,
    };
  }

  process(args: ParserProcessArgs): IParsedTx[] {
    const unstakeTx = this.zapOutUnstake(args);
    const swapTx = SwapEngine.swap(args);
    const withdrawLiquidityTx = LiquidityEngine.withdrawLiquidity(args);
    return [unstakeTx].concat(swapTx).concat(withdrawLiquidityTx);
  }
}

export const Zaps = {
  ZapOut,
};
