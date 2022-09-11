import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TxInfo } from '@terra-money/terra.js';
import { FCDApiService } from '@trackterra/app/api/fcd-api.service';
import { Chain } from '@trackterra/chains/enums/chain.enum';
import { FCDApi } from '@trackterra/core';
import config from '@trackterra/core/services/configs/config';
import { TTParser } from '@trackterra/parser';
import _ = require('lodash');
import { commonTxHashes } from './common';
import { lunaTxHashes } from './luna_txs';
import { luncTxHashes } from './lunc_txs';

const rawTxs = [
  {
    txs: lunaTxHashes,
    chain: Chain.luna,
  },
  {
    txs: commonTxHashes,
    chain: Chain.lunc,
  },
  {
    txs: luncTxHashes,
    chain: Chain.lunc,
  },
];

const txs: {
  label: string;
  txHash: string;
  walletAddress: string;
  chain: Chain;
  type: string;
}[] = [];

rawTxs.forEach((rawTxHashes) => {
  _.forEach(rawTxHashes.txs, (typeTxs, txType) => {
    _.forEach(typeTxs, (typeTx: any) => {
      txs.push({
        ...typeTx,
        type: txType,
        chain: rawTxHashes.chain,
      });
    });
  });
});

describe('The parser should classify and parse ', () => {
  let fcdApiService: FCDApiService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FCDApiService],
      imports: [
        ConfigModule.forRoot({
          load: [config],
          isGlobal: true,
        }),
      ],
    }).compile();

    fcdApiService = module.get<FCDApiService>(FCDApiService);
  });

  _.forEach(txs, (tx) => {
    it(`${tx.type} ${tx.label} transaction in ${tx.chain} chain`, async () => {
      console.log(tx.chain);

      const api = fcdApiService.api(tx.chain);

      const txInfo: TxInfo = await api.getByTxHash(tx.txHash);

      const result = await TTParser.parse(tx.walletAddress, txInfo);

      if (result === undefined || result.length == 0) {
        console.log(
          `Could not parse ${tx.type} of ${tx.label} tx in ${tx.chain} chain`,
        );
      }

      await new Promise((f) => setTimeout(f, 1000));
    });
  });
});
