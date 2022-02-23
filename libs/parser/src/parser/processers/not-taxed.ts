import { TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { IParsedTx, IParser } from '../parser.interfaces';

export class NotTaxed implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    return [{
      walletAddress: args.walletAddress,
      label: TxLabel.Fee,
      tag: TxTag.Cost,
      sender: args.walletAddress,
    }];
  }
}
