import { IParsedTx, IParser } from '../parser.interfaces';
import { TxLabel } from '../parser.enums';
import { ParserProcessArgs } from '../args';
import { TxTag } from '..';

export class FeeOnly implements IParser {
  process({ walletAddress, txType }: ParserProcessArgs): IParsedTx[] {
    return [
      {
        walletAddress,
        sender: walletAddress,
        label: TxLabel.Fee,
        tag: TxTag.Cost,
        friendlyDescription: txType.description,
      },
    ];
  }
}
