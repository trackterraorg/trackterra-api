import { separateAmountFromToken, splitTokens } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IAmount, IParsedTx, IParser, TxLabel } from '..';
import { ParserProcessArgs } from '../args';
import { LiquidityEngine } from './liquidity';
import { MintEngine } from './mint';

export class GenericAutoStake implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const provideLiquidityTxs = LiquidityEngine.provideLiquidity({
      ...args, txType: {
        ...args.txType,
        tag: TxLabel.Swap
      }
    });
    const mintTxs = MintEngine.mint(args);

    return provideLiquidityTxs.concat(mintTxs);
  }
}

export const Staking = {
  GenericAutoStake,
};
