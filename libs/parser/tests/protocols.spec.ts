import { TxInfo } from '@terra-money/terra.js';
import { FCDApi } from '@trackterra/core';
import { TTParser } from '@trackterra/parser';
import _ = require('lodash');
import { commonTxHashes } from './common';
import { lunaTxHashes } from './luna_txs';
import { luncTxHashes } from './lunc_txs';

const api = new FCDApi();

type Args = {
  txHash: string;
  walletAddress: string;
};

const doParseTx = async ({ txHash, walletAddress }: Args) => {
  const txInfo: TxInfo = await api.getByTxHash(txHash);

  const result = await TTParser.parse(walletAddress, txInfo);

  return result;
};

const tempsOnly = false;

describe('The parser should classify and parse ', () => {
  let txs: any[] = [];

  [commonTxHashes, luncTxHashes, lunaTxHashes].forEach((txHashes) => {
    if (tempsOnly) {
      return txHashes.temp;
    }
    _.forEach(txHashes, (value, key) => {
      if (value.length > 0) {
        txs.push(value);
      }
    });
  });

  Object.entries(txs).forEach(([protocol, txs]) => {
    txs.forEach((tx) => {
      it(`${protocol} ${tx.label} transaction`, async () => {
        const result = await doParseTx({
          txHash: tx.txHash,
          walletAddress: tx.walletAddress,
        });
        console.log(result);

        if (result === undefined || result.length == 0) {
          console.log(`Could not parse ${protocol} ${tx.label} tx`);
        }
      });
    });
  });
});
