import { ToBeDefinedException } from '../../exceptions';
import { IParsedTx, IParser } from '../parser.interfaces';

export class ToBeDefined implements IParser {
  process(): IParsedTx[] {
    throw new ToBeDefinedException();
  }
}
