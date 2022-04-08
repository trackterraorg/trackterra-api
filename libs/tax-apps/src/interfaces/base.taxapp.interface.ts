import { TxEntity } from '@trackterra/repository';
import { ICsvHeaderCell } from './csv-header-cell.interface';

export interface ITaxApp {
  processTxs(entities: TxEntity[]): any[] | null;
  csvCells(): ICsvHeaderCell[];
}
