import { lpTokenCombiner, separateAmountFromToken, splitTokens } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IAmount, IParsedTx, IParser, TxLabel } from '..';
import { ParserProcessArgs } from '../args';

export class LiquidationEngine {
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
      token: lpTokenCombiner(contract, assetTokens),
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
    const assets = withdrawLiquidity.refund_assets as unknown as string;
    const assetTokens = splitTokens(assets);

    const burn = _.first(contractActions.burn);

    const recievedToken: IAmount = {
      token: lpTokenCombiner(contract, assetTokens),
      amount: ((burn.amount as unknown as number) /
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
}
export class ProvideLiquidity implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    return LiquidationEngine.provideLiquidity(args);
  }
}
export class WithdrawLiquidity implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    return LiquidationEngine.withdrawLiquidity(args);
  }
}

export const Liquidations = {
  ProvideLiquidity,
  WithdrawLiquidity,
};
