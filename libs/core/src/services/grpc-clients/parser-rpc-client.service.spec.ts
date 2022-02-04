import { Test, TestingModule } from '@nestjs/testing';
import { ParserRpcClientService } from './parser-rpc-client.service';

describe('ParserRpcClientService', () => {
  let service: ParserRpcClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParserRpcClientService],
    }).compile();

    service = module.get<ParserRpcClientService>(ParserRpcClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
