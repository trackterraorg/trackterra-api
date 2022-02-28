import { separateAmountFromToken } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IAmount, IParsedTx, IParser, ISwapAction, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { LiquidityEngine } from './liquidity';
import { PoolTransferEngine } from './pool';


export class SpecProvideLiquidity implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const txType = args.txType;
    txType.description = 'Spec stake lp';
    const deposit = PoolTransferEngine.process({...args, txType});
    const provideLiquidity = LiquidityEngine.provideLiquidity(args);
    return deposit.concat(provideLiquidity);
  }
}

export const SpecProtocol = {
  SpecProvideLiquidity,
};
