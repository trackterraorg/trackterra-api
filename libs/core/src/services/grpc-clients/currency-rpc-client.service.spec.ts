import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyRpcClientService } from './currency-rpc-client.service';

describe('CurrencyRpcClientService', () => {
  let service: CurrencyRpcClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyRpcClientService],
    }).compile();

    service = module.get<CurrencyRpcClientService>(CurrencyRpcClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
