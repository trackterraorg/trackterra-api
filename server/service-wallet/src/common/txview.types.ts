import {
  FindTxsResponse,
  FindTxsResponseCointracker,
  FindTxsResponseKoinly,
  TxCointrackerNode,
  TxKoinlyNode,
  TxNode,
} from '@trackterra/proto-schema/wallet';

export type TaxAppViewTxNode = TxNode | TxCointrackerNode | TxKoinlyNode;
export type FindTaxAppViewTxsResponse =
  | FindTxsResponse
  | FindTxsResponseCointracker
  | FindTxsResponseKoinly
  | { csvFileName: string };
