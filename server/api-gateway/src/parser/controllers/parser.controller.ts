import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ParserRpcClientService } from '@trackterra/core';
import { SupportedProtocol } from '@trackterra/proto-schema/parser';
import { ParserService } from '../parser.service';

@Controller('/api/v1/parser')
@ApiTags('Parser')
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @Get('/protocols')
  @ApiOkResponse({ description: 'Support protocols' })
  async supportedProtocols(): Promise<SupportedProtocol[]> {
    const result = await this.parserService.supportedProtocols();
    return result.protocols;
  }
}
