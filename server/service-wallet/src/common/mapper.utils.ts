import { fShortenHash } from '@trackterra/common';
import { Tx, TxExtra, TxNode } from '@trackterra/proto-schema/wallet';
import _ = require('lodash');

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
