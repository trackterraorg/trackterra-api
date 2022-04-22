import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GetSupportedProtocolsCommand, ParseWalletCommand } from './cqrs';

import {
  ParseWalletRequest,
  ParseWalletResponse,
  SupportedProtocolsResponse,
} from '@trackterra/proto-schema/parser';

@Controller('parser')
export class ParserService {
  constructor(private readonly commandBus: CommandBus) {}

  supportedProtocols(): Promise<SupportedProtocolsResponse> {
    return this.commandBus.execute(new GetSupportedProtocolsCommand());
  }

  doParse(request: ParseWalletRequest, ctx: any): Promise<ParseWalletResponse> {
    return this.commandBus.execute(new ParseWalletCommand(request));
  }
}
