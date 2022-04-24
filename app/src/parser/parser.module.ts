import { forwardRef, Module } from '@nestjs/common';
import { ParserService } from './parser.service';
import { ParserCommandHandlers } from './cqrs';
import { TTParserService } from '@trackterra/core/services/others/parser.service';
import { TTParser } from '@trackterra/parser';
import { ParserController } from './controllers/parser.controller';
import { CurrenciesService } from '../currencies/currencies.service';
import { WalletsModule } from '../wallets/wallets.module';
import { ApiModule } from '../api/api.module';

@Module({
  providers: [
    TTParser,
    TTParserService,
    ...ParserCommandHandlers,
    ParserService,
    CurrenciesService,
  ],
  controllers: [ParserController],
  imports: [forwardRef(() => WalletsModule), ApiModule],
  exports: [ParserService],
})
export class ParserModule {}
