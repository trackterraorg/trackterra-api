import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TxInfo } from '@terra-money/terra.js';
import { FCDApiService } from '@trackterra/app/api/fcd-api.service';
import { Chain } from '@trackterra/chains/enums/chain.enum';
import config from '@trackterra/core/services/configs/config';
import { TTParser } from '@trackterra/parser';
import _ = require('lodash');

const tx = {
  label: 'Eris protocol unstaking',
  txHash: '65F89990E2602670CB1CF6F598DED6B4F60E17E255A7F16916594F64753F8A90',
  walletAddress: 'terra1rk665gs04w7spmej846rsxfg0gssg2m9k3ymnd',
  chain: Chain.luna,
};
// const tx = {
//   label: 'Eris protocol staking',
//   txHash: 'D6ED7235A312BE0E51AE959FAA0A7A6E6C873D9F14F3C6DAD17F23E6B43C177F',
//   walletAddress: 'terra1rk665gs04w7spmej846rsxfg0gssg2m9k3ymnd',
//   chain: Chain.luna,
// };

describe('The parser should classify and parse ', () => {
  let fcdApiService: FCDApiService;

  beforeEach(async () => {
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

  it(` ${tx.label} transaction in ${tx.chain} chain`, async () => {
    const api = fcdApiService.api(tx.chain);

    const txInfo: TxInfo = await api.getByTxHash(tx.txHash);

    const result = await TTParser.parse(tx.walletAddress, txInfo);

    if (result === undefined || result.length == 0) {
      console.log(`Could not parse ${tx.label} tx in ${tx.chain} chain`);
    }
  });
});
