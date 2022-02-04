import { Test, TestingModule } from '@nestjs/testing';
import { ParserController } from './parser.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CacheModule } from '@nestjs/common';

describe('Parsers Controller', () => {
  let controller: ParserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule, CacheModule.register()],
      controllers: [ParserController],
    }).compile();

    controller = module.get<ParserController>(ParserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
