import { Module } from '@nestjs/common';
import { ParserController } from './parser.controller';
import { ParserResolver } from './parser.resolver';

@Module({
  controllers: [ParserController],
  providers: [ParserResolver],
})
export class ParserModule {}
