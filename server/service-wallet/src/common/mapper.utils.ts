import { fShortenHash, timeToRegularDateTime, timeToUtc } from '@trackterra/common';
import {
  Tx,
  TxExtra,
  TxNode,
} from '@trackterra/proto-schema/wallet';
import { TxEntity } from '@trackterra/repository';
import { TaxAppType } from '@trackterra/tax-apps/types';
import _ = require('lodash');
import moment = require('moment');
import { TaxAppTxNode } from './taxapp.types';

export async function mapTxToTaxApp(
  txs: TxNode[],
  taxApp: TaxAppType,
): Promise<TaxAppTxNode[]> {
  let mappedTxs = txs?.map((txNode: TxNode) => {
    return {
      tx: taxApp.txObj().fromJSON(txNode.tx),
      extras: txNode.extras,
    };
  });

  if (taxApp.hasSpecialTags()) {
    mappedTxs = mappedTxs?.map((mappedTx) => {
      let tag: string = mappedTx.tx.tag;
      tag = taxApp.transformTag(tag);
      mappedTx.tx.tag = tag;
      return mappedTx;
    })
  }
  return mappedTxs;
}

export function txEntityToView(txEntity: TxEntity): TxNode {
  const tx: Tx = txEntity as unknown as Tx;
  tx.timestamp = timeToUtc(tx.timestamp);
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
