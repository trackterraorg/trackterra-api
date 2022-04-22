import { Module } from '@nestjs/common';
import {
  FCDApiService,
  WalletsRpcClientService,
  ContractRpcClientService,
} from '@trackterra/core';
import { ParserController } from './parser.controller';
import { ParserCommandHandlers } from './cqrs';
import { TTParserService } from '@trackterra/core/services/others/parser.service';
import { TTParser } from '@trackterra/parser';

@Module({
  imports: [FCDApiService],
  providers: [
    TTParser,
    TTParserService,
    FCDApiService,
    ...ParserCommandHandlers,
    WalletsRpcClientService,
    ContractRpcClientService,
  ],
  controllers: [ParserController],
})
export class ParserModule {}
