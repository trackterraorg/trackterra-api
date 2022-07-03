import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetSupportedProtocolsQuery, DoParseCommand } from './cqrs';
import {
  WalletRequest,
  ParseWalletResponse,
  SupportedProtocolRequest,
  SupportedProtocolsResponse,
} from './parser.types';

@Controller('parser')
export class ParserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  supportedProtocols(
    request: SupportedProtocolRequest,
  ): Promise<SupportedProtocolsResponse> {
    return this.queryBus.execute(new GetSupportedProtocolsQuery(request));
  }

  doParse(request: WalletRequest): Promise<ParseWalletResponse> {
    return this.commandBus.execute(new DoParseCommand(request));
  }
}
