import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { GetSupportedProtocolsCommand, ParseWalletCommand } from './cqrs';

import {
  ParserService,
  ParseWalletRequest,
  ParseWalletResponse,
  SupportedProtocolsRequest,
  SupportedProtocolsResponse,
} from '@trackterra/proto-schema/parser';

@Controller('parser')
export class ParserController implements ParserService<any> {
  constructor(private readonly commandBus: CommandBus) {}

  @GrpcMethod('ParserService')
  doParse(request: ParseWalletRequest, ctx: any): Promise<ParseWalletResponse> {
    return this.commandBus.execute(new ParseWalletCommand(request));
  }

  @GrpcMethod('ParserService')
  supportedProtocols(): Promise<SupportedProtocolsResponse> {
    return this.commandBus.execute(new GetSupportedProtocolsCommand());
  }
}
