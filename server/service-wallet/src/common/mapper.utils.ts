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
import { TaxAppView } from '@trackterra/repository/enums/txviews.enum';
import { CurrenciesService } from 'server/service-parser/src/currencies/currencies.service';
import _ = require('lodash');
import moment = require('moment');
import { TaxAppViewTxNode } from './txview.types';

export async function mapTxToTaxApp(
  txs: TxNode[],
  taxapp: TaxAppView,
): Promise<TaxAppViewTxNode[]> {
  let obj;

  switch (taxapp) {
    case TaxAppView.koinly:
      obj = TxKoinly;
      break;

    case TaxAppView.cointracker:
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

const txHeaderLabel = {
  txhash: 'Txhash',
  blockHeight: 'Block height',
  timestamp: 'Timestamp',
  label: 'Label',
  tag: 'Tag',
  walletAddress: 'Wallet address',
  contract: 'Contract',
  sender: 'Sender',
  recipient: 'Recipient',
  receivedAmount: 'Received amount',
  receivedToken: 'Received token',
  sentAmount: 'Sent amount',
  sentToken: 'Sent token',
  feeAmount: 'Fee amount',
  feeToken: 'Fee token',
  taxAmount: 'Tax amount',
  taxToken: 'Tax token',
  netWorthAmount: 'Networth amount',
  netWorthToken: 'Networth token',
  memo: 'Memo',
  friendlyDescription: 'Friendly description',
  createdAt: 'Created at',
  updatedAt: 'Updated at',
};
