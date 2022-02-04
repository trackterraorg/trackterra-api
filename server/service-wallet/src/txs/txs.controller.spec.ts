import { Test, TestingModule } from '@nestjs/testing';
import { TxsController } from './txs.controller';

describe('Txs Controller', () => {
  let controller: TxsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TxsController],
    }).compile();

    controller = module.get<TxsController>(TxsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
