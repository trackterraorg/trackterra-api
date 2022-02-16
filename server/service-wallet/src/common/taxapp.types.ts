import {
  FindTxsResponse,
  FindTxsResponseCointracker,
  FindTxsResponseKoinly,
  Tx,
  TxCointracker,
  TxKoinly,
} from '@trackterra/proto-schema/wallet';

export type TaxAppTxType = Tx | TxCointracker | TxKoinly;

export type FindTaxAppTxsResponse =
  | FindTxsResponse
  | FindTxsResponseCointracker
  | FindTxsResponseKoinly
  | { csvFileName: string };
