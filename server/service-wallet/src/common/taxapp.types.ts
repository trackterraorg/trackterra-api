import {
  FindTxsResponse,
  FindTxsResponseCointracker,
  FindTxsResponseKoinly,
  TxCointrackerNode,
  TxKoinlyNode,
  TxNode,
} from '@trackterra/proto-schema/wallet';

export type TaxAppTxNode = TxNode | TxCointrackerNode | TxKoinlyNode;
export type FindTaxAppTxsResponse =
  | FindTxsResponse
  | FindTxsResponseCointracker
  | FindTxsResponseKoinly
  | { csvFileName: string };
