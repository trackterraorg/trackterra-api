import { ICsvHeaderCell } from './csv-header-cell.interface';
import { ITagTransform } from './tag-transform.interface';

export interface ITaxApp {
  txObj(): any;
  csvCells(): ICsvHeaderCell[];
}
