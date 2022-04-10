import _ = require('lodash');
import { TxEntity } from '@trackterra/repository';
import { ICsvHeaderCell } from '../interfaces/csv-header-cell.interface';
import { AppAttrType, RowFormatterType } from './app.types';

export abstract class BaseTaxApp {
  abstract attributes: AppAttrType[];
  abstract rowFormatter: RowFormatterType;

  processTxs(entities: TxEntity[]): any[] {
    let mappedTxs = this.pluckAttrs(entities);

    mappedTxs = this.formatRows(mappedTxs);

    return this.formatAttrs(mappedTxs);
  }

  private pluckAttrs(entities: TxEntity[]): any[] {
    const appKeys = this.attributes.map((attrs: any) => {
      return attrs.id;
    });

    return entities.map((entity: TxEntity) => {
      return _.pick(entity, appKeys);
    });
  }

  private formatRows(mappedTxs: any[]): any[] {
    return mappedTxs.map((tx) => {
      return this.rowFormatter.formatter(tx);
    });
  }

  private formatAttrs(mappedTxs: any[]): any[] {
    const attrsToFormat = this.attributes.filter((attr) => {
      return Object.keys(attr).includes('formatter');
    });

    if (_.size(attrsToFormat) > 0) {
      mappedTxs = mappedTxs.map((tx) => {
        _.forEach(attrsToFormat, (attr) => {
          tx[attr.id] = attr?.formatter({
            attrValue: tx[attr.id],
            row: tx,
          });
        });
        return tx;
      });
    }

    return mappedTxs;
  }

  csvCells(): ICsvHeaderCell[] {
    return this.attributes.map((attr) => {
      return {
        id: attr.id,
        title: attr.title,
      };
    });
  }
}
