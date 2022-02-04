import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ParserRpcClientService } from '@trackterra/core';
import { SupportedProtocol } from '@trackterra/proto-schema/parser';

@Controller('/api/v1/parser')
@ApiTags('Parser')
export class ParserController {
  constructor(private readonly parserService: ParserRpcClientService) {}

  @Get('/protocols')
  @ApiOkResponse({ description: 'Support protocols' })
  async supportedProtocols(): Promise<SupportedProtocol[]> {
    const result = await this.parserService.svc
      .supportedProtocols({})
      .toPromise();
    return result.protocols;
  }
}
