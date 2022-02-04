import { TxInfo } from '@terra-money/terra.js';
import { TxType } from '../loader';
import { TransformedData } from '../transformers/transformer.interfaces';

export interface ParserProcessArgs extends TransformedData {
  txType: TxType;
  walletAddress: string;
  txInfo?: TxInfo;
}
