import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GetSupportedProtocolsCommand, DoParseCommand } from './cqrs';
import {
  ParseWalletRequest,
  ParseWalletResponse,
  SupportedProtocolsResponse,
} from './parser.types';

@Controller('parser')
export class ParserService {
  constructor(private readonly commandBus: CommandBus) {}

  supportedProtocols(): Promise<SupportedProtocolsResponse> {
    return this.commandBus.execute(new GetSupportedProtocolsCommand());
  }

  doParse(request: ParseWalletRequest): Promise<ParseWalletResponse> {
    return this.commandBus.execute(new DoParseCommand(request));
  }
}
