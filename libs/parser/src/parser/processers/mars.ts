import { separateAmountFromToken } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IAmount, IParsedTx, IParser, ISwapAction, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { LiquidityEngine } from './liquidity';
import { MintEngine } from './mint';
import { SwapEngine } from './swap';
import { ITransferRecord, TransferEngine } from './transfer';


export class MarsLeveragedYeildFarmingOpenPosition implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const { walletAddress, contractActions } = args;

    const borrowActions = contractActions.borrow.map((cA: any) => {
      return {
        sender: cA.contract,
        recipient: walletAddress,
        amount: {
          amount: cA.amount,
          token: cA.asset,
        }
      }
    });

    const borrowTx = (new TransferEngine()).process({
      ...args,
      contractActions: undefined,
      transferActions: borrowActions,
    })

    const liquidityTx = LiquidityEngine.provideLiquidity(args);

    const poolDepositActions = contractActions.send.map((cA: any) => {
      return {
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

    return borrowTx.concat(liquidityTx).concat(poolDepositTx);
  }
}

export class MarsLeveragedYeildFarmingAdjustPosition implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const { walletAddress, contractActions } = args;

    const poolWithdrawalActions = contractActions.send.map((cA: any) => {
      return {
        sender: cA.from,
        recipient: walletAddress,
        amount: {
          amount: cA.amount,
          token: cA.contract,
        }
      }
    });

    const poolWithdrawalTx = (new TransferEngine()).process({
      ...args,
      contractActions: undefined,
      transferActions: poolWithdrawalActions,
      txType: {
        ...args.txType, 
        tag: TxTag.PoolWithdrawal,
      }
    })

    const liquidityTx = LiquidityEngine.withdrawLiquidity(args);

    const repayActions = contractActions.repay.map((cA: any) => {
      return {
        contract: cA.contract,
        sender: walletAddress,
        recipient: cA.contract,
        amount: {
          amount: cA.amount,
          token: cA.asset,
        }
      }
    });

    const repayTx = (new TransferEngine()).process({
      ...args,
      contractActions: undefined,
      transferActions: repayActions
    });

    return poolWithdrawalTx.concat(liquidityTx).concat(repayTx);
  }
}

export class MarsLeveragedYeildFarmingClosePosition implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const { walletAddress, contractActions } = args;

    const poolWithdrawalActions = contractActions.send.map((cA: any) => {
      return {
        sender: cA.from,
        recipient: walletAddress,
        amount: {
          amount: cA.amount,
          token: cA.contract,
        }
      }
    });

    const poolWithdrawalTx = (new TransferEngine()).process({
      ...args,
      contractActions: undefined,
      transferActions: [_.first(poolWithdrawalActions)],
      txType: {
        ...args.txType, 
        tag: TxTag.PoolWithdrawal,
      }
    })

    const liquidityTx = LiquidityEngine.withdrawLiquidity(args);

    const repayActions = contractActions.repay.map((cA: any) => {
      return {
        contract: cA.contract,
        sender: walletAddress,
        recipient: cA.contract,
        amount: {
          amount: cA.amount,
          token: cA.asset,
        }
      }
    });

    const swapTx = SwapEngine.swap(args);
    
    const repayTx = (new TransferEngine()).process({
      ...args,
      contractActions: undefined,
      transferActions: repayActions
    });

    return poolWithdrawalTx.concat(liquidityTx).concat(swapTx).concat(repayTx);
  }
}

export const MarsProtocol = {
  MarsLeveragedYeildFarmingOpenPosition,
  MarsLeveragedYeildFarmingAdjustPosition,
  MarsLeveragedYeildFarmingClosePosition,
};
