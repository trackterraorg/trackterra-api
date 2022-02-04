import { Test, TestingModule } from '@nestjs/testing';
import { WalletsRpcClientService } from './wallets-rpc-client.service';

describe('WalletsRpcClientService', () => {
  let service: WalletsRpcClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletsRpcClientService],
    }).compile();

    service = module.get<WalletsRpcClientService>(WalletsRpcClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
