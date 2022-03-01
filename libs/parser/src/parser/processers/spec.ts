import { separateAmountFromToken } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IAmount, IParsedTx, IParser, ISwapAction, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { LiquidityEngine } from './liquidity';
import { PoolTransferEngine } from './pool';
import { SwapEngine } from './swap';
import { TransferEngine } from './transfer';


export class SpecProvideLiquidity implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const txType = args.txType;
    txType.description = 'Spec stake lp';
    const deposit = PoolTransferEngine.process({...args, txType});
    const provideLiquidity = LiquidityEngine.provideLiquidity(args);
    return deposit.concat(provideLiquidity);
  }
}

export class SpecUnstakeLp implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const txType = args.txType;
    txType.description = 'Spec unstake lp';
    const poolWithdrawalTx = (new TransferEngine()).process({
      ...args, 
      contractActions: {
        send: [_.first(args.contractActions.send)],
      },
      txType: {
        ...args.txType,
        tag: TxTag.PoolDeposit,
      },
      transferActions: undefined
    });
    const poolDepositTx = PoolTransferEngine.process({...args, txType});
    const withdrawLiquidityTx = LiquidityEngine.withdrawLiquidity(args);
    const swapTx = SwapEngine.swap(args);

    return poolWithdrawalTx.concat(poolDepositTx).concat(withdrawLiquidityTx).concat(swapTx);
  }
}

export const SpecProtocol = {
  SpecProvideLiquidity,
  SpecUnstakeLp,
};
