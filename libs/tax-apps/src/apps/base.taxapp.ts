import { TxTag } from '@trackterra/parser/parser';
import _ = require('lodash');
import { ICsvHeaderCell } from '../interfaces/csv-header-cell.interface';
import { AppAttrType } from './app.types';

export abstract class BaseTaxApp {
  abstract attributes: AppAttrType[];

  csvCells(): ICsvHeaderCell[] {
    return this.attributes.map((attr) => {
      return {
        id: attr.id,
        title: attr.title,
      };
    });
  }
}
