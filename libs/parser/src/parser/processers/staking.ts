import { separateAmountFromToken, splitTokens } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IAmount, IParsedTx, IParser, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { LiquidityEngine } from './liquidity';
import { MintEngine } from './mint';
import { PoolTransferEngine } from './pool';
import { ITransferRecord, TransferEngine } from './transfer';

export class GenericAutoStake implements IParser {
  poolDeposit(args: ParserProcessArgs) {
    const provideLiquidityTxs = LiquidityEngine.provideLiquidity({
      ...args,
      txType: {
        ...args.txType,
        tag: TxLabel.Swap,
      },
    });

    const mintAction: any = _.first(args.contractActions.mint);
    const transferAction: ITransferRecord = {
      contract: mintAction.contract,
      sender: args.walletAddress,
      recipient: mintAction.contract,
      amount: {
        amount: mintAction.amount,
        token: mintAction.contract,
      },
    };

    const poolDepositTx = new TransferEngine().process({
      ...args,
      txType: {
        ...args.txType,
        tag: TxTag.PoolDeposit,
      },
      contractActions: undefined,
      transferActions: [transferAction],
    });

    return provideLiquidityTxs.concat(poolDepositTx);
  }

  poolWithdraw(args: ParserProcessArgs) {
    const withdrawLiquidityTxs = LiquidityEngine.withdrawLiquidity({
      ...args,
      txType: {
        ...args.txType,
        tag: TxLabel.Swap,
      },
    });

    const burnAction: any = _.first(args.contractActions.burn);
    const transferAction: ITransferRecord = {
      contract: burnAction.contract,
      sender: burnAction.contract,
      recipient: args.walletAddress,
      amount: {
        amount: burnAction.amount,
        token: burnAction.contract,
      },
    };

    const poolWithdrawTx = new TransferEngine().process({
      ...args,
      txType: {
        ...args.txType,
        tag: TxTag.PoolWithdrawal,
      },
      contractActions: undefined,
      transferActions: [transferAction],
    });

    return withdrawLiquidityTxs.concat(poolWithdrawTx);
  }

  process(args: ParserProcessArgs): IParsedTx[] {
    const keys = Object.keys(args.contractActions);

    if (keys.includes('provide_liquidity')) {
      return this.poolDeposit(args);
    }

    if (keys.includes('withdraw_liquidity')) {
      return this.poolWithdraw(args);
    }

    return [];
  }
}

export const Staking = {
  GenericAutoStake,
};
