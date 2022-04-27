import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BaseApiResponse,
  SwaggerBaseApiResponse,
} from '@trackterra/repository/dtos/response/base-api-response.dto';
import { ParserService } from '../parser.service';
import { SupportedProtocolDto } from './dto';

@Controller('/api/v1/parser')
@ApiTags('Parser')
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @Get('/protocols')
  @ApiOperation({
    summary: 'List of supported protocols',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(SupportedProtocolDto),
  })
  async supportedProtocols(): Promise<BaseApiResponse<SupportedProtocolDto[]>> {
    return { data: await this.parserService.supportedProtocols(), meta: {} };
  }
}
