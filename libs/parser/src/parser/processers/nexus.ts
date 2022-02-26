import { separateAmountFromToken } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IAmount, IParsedTx, IParser, ISwapAction, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { MintEngine } from './mint';
import { SwapEngine } from './swap';
import { TransferEngine } from './transfer';

export class NexusStakingRewards implements IParser {

  process(args: ParserProcessArgs): IParsedTx[] {
    return (new TransferEngine()).process(args);
  };
  
}


export const NexusProtocol = {
  NexusStakingRewards,
};
