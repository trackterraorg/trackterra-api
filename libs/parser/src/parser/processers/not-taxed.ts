import { ToBeDefinedException } from '../../exceptions';
import { IParsedTx, IParser } from '../parser.interfaces';

export class NotTaxed implements IParser {
  process(): IParsedTx[] {
    return ;
  }
}
