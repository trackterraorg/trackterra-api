import { separateAmountFromToken } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IParsedTx, IParser, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';

export class NativeGovVote implements IParser {

  process(args: ParserProcessArgs): IParsedTx[] {
    
    const { walletAddress, txType } = args;

    return [{
      walletAddress,
      label: TxLabel.Fee,
      tag: txType.tag,
      sender: walletAddress,
      friendlyDescription: txType.description,
    }];
  }
}

export const Native = {
  NativeGovVote,
};
