import { Test, TestingModule } from '@nestjs/testing';
import { TxsResolver } from './wallet-txs.resolver';

describe('TxsResolver', () => {
  let resolver: TxsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TxsResolver],
    }).compile();

    resolver = module.get<TxsResolver>(TxsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
