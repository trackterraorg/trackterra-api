import { IParsedTx, IParser } from '../parser.interfaces';
import { ParserProcessArgs } from '../args';

export class Ignore implements IParser {
  process(_args: ParserProcessArgs): IParsedTx[] {
    return [];
  }
}
