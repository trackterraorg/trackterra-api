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
import { TaxAppTxType } from './taxapp.types';

export async function mapTxToTaxApp(
  txs: TxEntity[],
  taxApp: TaxAppType,
): Promise<TaxAppTxType[]> {
  let mappedTxs = txs?.map((txEntity: TxEntity) => {
    return taxApp.txObj().fromJSON(txEntity);
  });

  // format cells
  const attrsToFormat = taxApp.attributes.filter((attr) => {
    return Object.keys(attr).includes('formatter');
  });

  if (_.size(attrsToFormat) > 0) {
    mappedTxs = mappedTxs.map((tx) => {
      _.forEach(attrsToFormat, (attr) => {
        tx[attr.id] = attr?.formatter(tx[attr.id]);
      });
      return tx;
    });
  }
  
  return mappedTxs;
}

export function txEntityToView(tx: Tx): TxNode {
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
