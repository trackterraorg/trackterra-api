import { TxInfo } from '@terra-money/terra.js';
import { TxType } from '../loader';
import { TransformedEvents } from '../transformers/transformer.interfaces';

export interface ParserProcessArgs extends TransformedEvents {
  txType: TxType;
  walletAddress: string;
  txInfo?: TxInfo;
  /** some events use data from other events */
  allEvents?: TransformedEvents[];
}
