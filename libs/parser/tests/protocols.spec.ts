import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TxInfo } from '@terra-money/terra.js';
import { Chain } from '@trackterra/chains/enums/chain.enum';
import { FcdConfig } from '@trackterra/common/interfaces/config.interface';
import { FCDApi } from '@trackterra/core';
import { TTParser } from '@trackterra/parser';
import _ = require('lodash');
import { commonTxHashes } from './common';
import { lunaTxHashes } from './luna_txs';
import { luncTxHashes } from './lunc_txs';

const rawTxs = [
  {
    txs: commonTxHashes,
    chain: Chain.luna,
  },
  {
    txs: lunaTxHashes,
    chain: Chain.luna,
  },
  {
    txs: luncTxHashes,
    chain: Chain.lunc,
  },
];

type Args = {
  api: FCDApi;
  txHash: string;
  walletAddress: string;
};

const doParseTx = async ({ api, txHash, walletAddress }: Args) => {
  const txInfo: TxInfo = await api.getByTxHash(txHash);

  const result = await TTParser.parse(walletAddress, txInfo);

  return result;
};

const tempsOnly = true;

describe('TestProtocols ', () => {
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
    console.log(configService);
  });

  describe('The parser should classify and parse', async () => {
    rawTxs.forEach((rawTxHashes) => {
      let txs: any[] = [];

      if (tempsOnly) {
        if (!_.isEmpty(rawTxHashes.txs.temp)) {
          txs.push(rawTxHashes.txs.temp);
        }
      } else {
        _.forEach(rawTxHashes.txs, (value, key) => {
          if (value.length > 0) {
            txs.push(value);
          }
        });
      }

      const fcdUrl = configService.get<FcdConfig>(
        `fcd_${rawTxHashes.chain}`,
      )?.url;

      const api = new FCDApi(fcdUrl);

      Object.entries(txs).forEach(([protocol, txs]) => {
        txs.forEach((tx) => {
          it(`${protocol} ${tx.label} transaction`, async () => {
            const result = await doParseTx({
              api,
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
  });
});
