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
    const deposit = PoolTransferEngine.process({ ...args, txType });
    const provideLiquidity = LiquidityEngine.provideLiquidity(args);
    return deposit.concat(provideLiquidity);
  }
}

export class SpecUnstakeLp implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const { walletAddress, txType } = args;

    txType.description = 'Spec unstake lp';

    const poolWithdrawalActions = args.contractActions.send
      .filter((cA: any) => {
        return cA.from === walletAddress;
      })
      .map((cA: any) => {
        cA.contract = cA.contract;
        cA.sender = cA.contract;
        cA.recipient = walletAddress;
        cA.amount = {
          amount: cA.amount,
          token: cA.contract,
        };
        return _.pick(cA, ['contract', 'sender', 'recipient', 'amount']) as any;
      });

    const poolWithdrawalTx = new TransferEngine().process({
      ...args,
      contractActions: undefined,
      txType: {
        ...args.txType,
        tag: TxTag.PoolWithdrawal,
      },
      transferActions: poolWithdrawalActions,
    });

    const withdrawLiquidityTx = LiquidityEngine.withdrawLiquidity(args);
    const swapTx = SwapEngine.swap(args);

    return poolWithdrawalTx.concat(withdrawLiquidityTx).concat(swapTx);
  }
}

export const SpecProtocol = {
  SpecProvideLiquidity,
  SpecUnstakeLp,
};
