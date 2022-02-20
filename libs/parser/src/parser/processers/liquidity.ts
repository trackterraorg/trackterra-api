import { lpTokenCombiner, separateAmountFromToken, splitTokens } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IAmount, IParsedTx, IParser, TxLabel } from '..';
import { ParserProcessArgs } from '../args';
import { PoolTransferEngine } from './pool';

export class LiquidityEngine {
  static provideLiquidity({
    walletAddress,
    txType,
    contractActions,
  }: ParserProcessArgs): IParsedTx[] {
    const provideLiquidity = contractActions.provide_liquidity.find((rec) => {
      return Object.keys(rec).includes('share');
    });
    const contract = provideLiquidity.contract as unknown as string;
    const assets = provideLiquidity.assets as unknown as string;

    const assetTokens = splitTokens(assets);

    const mint = _.first(contractActions.mint);
    const recievedToken: IAmount = {
      token: mint.contract as unknown as string,
      amount: ((mint.amount as unknown as number) /
        assetTokens.length) as unknown as string,
    };

    const result = [];

    for (let index = 0; index < assetTokens.length; index++) {
      const sentToken = assetTokens[index];
      result.push({
        walletAddress,
        contract: contract,
        label: TxLabel.Swap,
        tag: txType.tag,
        sender: walletAddress,
        sentAmount: sentToken.amount,
        sentToken: sentToken.token,
        recipient: walletAddress,
        receivedAmount: recievedToken.amount,
        receivedToken: recievedToken.token,
        friendlyDescription: txType.description,
      });
    }
    return result;
  }

  static withdrawLiquidity({
    walletAddress,
    txType,
    contractActions,
  }: ParserProcessArgs): IParsedTx[] {
    const withdrawLiquidity = contractActions.withdraw_liquidity.find((rec) => {
      return Object.keys(rec).includes('refund_assets');
    });

    const contract = withdrawLiquidity.contract as unknown as string;
    const refundAssets = withdrawLiquidity.refund_assets as unknown as string;
    const refundAssetTokens = splitTokens(refundAssets);

    const burn = _.first(contractActions.burn);

    const burnToken: IAmount = {
      token: burn.contract as unknown as string,
      amount: ((burn.amount as unknown as number) /
        refundAssetTokens.length) as unknown as string,
    };

    const result = [];

    for (let index = 0; index < refundAssetTokens.length; index++) {
      const receivedToken = refundAssetTokens[index];
      result.push({
        walletAddress,
        contract: contract,
        label: TxLabel.Swap,
        tag: txType.tag,
        sender: walletAddress,
        sentAmount: burnToken.amount,
        sentToken: burnToken.token,
        recipient: walletAddress,
        receivedAmount: receivedToken.amount,
        receivedToken: receivedToken.token,
        friendlyDescription: txType.description,
      });
    }
    return result;
  }
}
export class ProvideLiquidity implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    return LiquidityEngine.provideLiquidity(args);
  }
}
export class WithdrawLiquidity implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    return LiquidityEngine.withdrawLiquidity(args);
  }
}

export class SpecProvideLiquidity implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const txType = args.txType;
    txType.description = 'Spec stake lp';
    const deposit = PoolTransferEngine.process({...args, txType});
    const provideLiquidity = LiquidityEngine.provideLiquidity(args);
    return deposit.concat(provideLiquidity);
  }
}

export const Liquidates = {
  ProvideLiquidity,
  WithdrawLiquidity,
  SpecProvideLiquidity,
};
