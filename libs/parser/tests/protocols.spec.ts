import { TxInfo } from '@terra-money/terra.js';
import { FCDApi } from '@trackterra/core';
import { TTParser } from '@trackterra/parser';
import { txHashes } from './txs';

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

const testProtocolOnly = true;

describe('The parser should classify and parse ', () => {
  const txs = testProtocolOnly ? { tests: txHashes.tests } : txHashes;

  Object.entries(txs).forEach(([protocol, txs]) => {
    txs.forEach((tx) => {
      it(`${protocol} ${tx.label} transaction`, async () => {
        const result = await doParseTx({
          txHash: tx.txHash,
          walletAddress: tx.walletAddress,
        });

        if (result === undefined || result.length == 0) {
          console.log(`Could not parse ${protocol} ${tx.label} tx`);
        }
        console.dir(result, { depth: 'null' });
      });
    });
  });
});
