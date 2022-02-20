import { separateAmountFromToken } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IAmount, IParsedTx, IParser, ISwapAction, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { LiquidityEngine } from './liquidity';
import { PoolTransferEngine } from './pool';
import { SwapEngine } from './swap';

export class ZapIn implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {

    const { walletAddress } = args;
    const swapTx = SwapEngine.swap(args);
    const provideLiquidtyTx = LiquidityEngine.provideLiquidity(args);

    const txType = args.txType;
    txType.tag = TxTag.PoolDeposit;

    const contractActions = _.pick(args.contractActions, ['send', 'bond']);

    contractActions.send = contractActions.send.map((cA: any) => {
      cA.from = walletAddress;
      return cA;
    })

    const transferActions = undefined;

    const poolDepositTx = PoolTransferEngine.process({
      ...args, 
      contractActions,
      txType,
      transferActions,
    });

    return  swapTx.concat(provideLiquidtyTx).concat(poolDepositTx);
  }
}

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
  ZapIn,
  ZapOut,
};
