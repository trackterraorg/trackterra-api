import { IParsedTx } from '../parser';

export interface TTOutput extends IParsedTx {
  txhash: string;
  blockHeight: string;
  timestamp: string;

  memo?: string;
}
