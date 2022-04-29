import { Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  BaseApiResponse,
  SwaggerBaseApiResponse,
} from '@trackterra/repository/dtos/response/base-api-response.dto';
import { CurrenciesService } from '../currencies.service';
import { CurrencyDto } from './dto/currency.dto';

@Controller('/api/v1/currencies')
@ApiTags('Currency')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get('/')
  @ApiOperation({
    summary: 'List of currencies',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CurrencyDto),
  })
  async listCurrencies(): Promise<BaseApiResponse<CurrencyDto[]>> {
    const result = await this.currenciesService.listCurrencies();
    return {
      data: result.currencies,
      meta: {
        totalCount: result.count,
      },
    };
  }

  @Post('/:identifier')
  @ApiOperation({
    summary: 'Upsert currency',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CurrencyDto),
  })
  async upsertCurreny(
    @Param('identifier') identifier: string,
  ): Promise<BaseApiResponse<CurrencyDto>> {
    const result = await this.currenciesService.upsertCurrency({
      identifier,
    });
    return {
      data: result,
      meta: {},
    };
  }
}
