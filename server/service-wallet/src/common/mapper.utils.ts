import { fShortenHash, timeToRegularDateTime } from '@trackterra/common';
import {
  CreateTxRequest,
  Tx,
  TxCointracker,
  TxEdge,
  TxExtra,
  TxKoinly,
  TxNode,
} from '@trackterra/proto-schema/wallet';
import { TxEntity } from '@trackterra/repository';
import { TaxApp } from '@trackterra/repository/enums/taxapp.enum';
import _ = require('lodash');
import moment = require('moment');
import { TaxAppTxNode } from './taxapp.types';

export async function mapTxToTaxApp(
  txs: TxNode[],
  taxapp: TaxApp,
): Promise<TaxAppTxNode[]> {
  let obj;

  switch (taxapp) {
    case TaxApp.koinly:
      obj = TxKoinly;
      break;

    case TaxApp.cointracker:
      obj = TxCointracker;
      break;

    default:
      return txs;
  }

  return txs.map((txNode: TxNode) => {
    return {
      tx: obj.fromJSON(txNode.tx),
      extras: txNode.extras,
    };
  });
}

export function txViewToKoinlyTx(tx: Tx): TxKoinly {
  return TxKoinly.fromJSON(tx);
}

export function txViewToCointrackerTx(tx: Tx): TxCointracker {
  return TxCointracker.fromJSON(tx);
}

export function txEntityToView(txEntity: TxEntity): TxNode {
  const tx: Tx = txEntity as unknown as Tx;
  const extras: TxExtra = {
    sTxHash: fShortenHash(tx.txhash),
    rTimestamp: tx.timestamp,
    sWalletAddress: fShortenHash(tx.walletAddress),
    sContract: fShortenHash(tx.contract),
    sSender: fShortenHash(tx.sender),
    sRecipient: fShortenHash(tx.recipient),
  };

  return { tx, extras };
}
