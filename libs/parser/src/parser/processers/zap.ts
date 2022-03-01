import { separateAmountFromToken } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IAmount, IParsedTx, IParser, ISwapAction, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { LiquidityEngine } from './liquidity';
import { PoolTransferEngine } from './pool';
import { SwapEngine } from './swap';
import { TransferEngine } from './transfer';

export class ZapIn implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {

    const { walletAddress } = args;
    const swapTx = SwapEngine.swap({
      ...args,
      txType: {
        ...args.txType,
        tag: TxTag.Swap,
      }
    });
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
  removeLiquidity(args: ParserProcessArgs): IParsedTx[] {
    const { walletAddress, txType } = args;
    const removeLiquidity: any = _.first(args.contractActions.send);
    removeLiquidity.to = args.walletAddress;

    return (new TransferEngine()).process({
      ...args,
      contractActions: {
        send: [removeLiquidity],
      },
      transferActions: undefined,
      txType: {
        ...args.txType,
        description: 'Remove liquidity',
        tag: TxTag.PoolWithdrawal,
      }
    });
  }

  process(args: ParserProcessArgs): IParsedTx[] {
    const removeLiquidityTx = this.removeLiquidity(args);
    const withdrawLiquidityTx = LiquidityEngine.withdrawLiquidity(args);
    const swapTx = SwapEngine.swap(args);
    return removeLiquidityTx.concat(withdrawLiquidityTx).concat(swapTx);
  }
}

export const Zaps = {
  ZapIn,
  ZapOut,
};
