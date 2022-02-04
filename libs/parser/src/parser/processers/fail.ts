import { IParsedTx, IParser } from '../parser.interfaces';
import { TxLabel } from '../parser.enums';
import { ParserProcessArgs } from '../args';

export class Fail implements IParser {
  process({ walletAddress, txType }: ParserProcessArgs): IParsedTx[] {
    return [
      {
        walletAddress,
        label: TxLabel.Fail,
        tag: txType.tag,
        friendlyDescription: txType.description,
      },
    ];
  }
}
