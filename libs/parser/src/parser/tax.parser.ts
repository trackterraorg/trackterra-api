import { IAmount } from './parser.interfaces';
import { separateAmountFromToken } from '../utils/helpers';

export class TaxParser {
  static process(value: string | undefined): IAmount | undefined {
    if (value === '' || value === undefined) {
      return undefined;
    }

    return separateAmountFromToken(value);
  }
}
