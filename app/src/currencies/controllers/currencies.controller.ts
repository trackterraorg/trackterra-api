import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Chain } from '@trackterra/chains/enums/chain.enum';
import {
  BaseApiResponse,
  SwaggerBaseApiResponse,
} from '@trackterra/repository/dtos/response/base-api-response.dto';
import { CurrenciesService } from '../currencies.service';
import {
  CurrencyInputDto,
  CurrencyRequestDto,
  CurrencyResponseDto,
} from './dto/currency.dto';

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
    type: SwaggerBaseApiResponse(CurrencyResponseDto),
  })
  async listCurrencies(
    @Query() { chain }: CurrencyRequestDto,
  ): Promise<BaseApiResponse<CurrencyResponseDto[]>> {
    const result = await this.currenciesService.listCurrencies(chain);
    return {
      data: result.currencies,
      meta: {
        totalCount: result.count,
      },
    };
  }

  @Post('/')
  @ApiOperation({
    summary: 'Upsert currency',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CurrencyInputDto),
  })
  async upsertCurreny(
    @Query() { chain, identifier }: CurrencyInputDto,
  ): Promise<BaseApiResponse<CurrencyResponseDto>> {
    const result = await this.currenciesService.upsertCurrency({
      chain,
      identifier,
    });

    console.log(result);
    return {
      data: result,
      meta: {},
    };
  }
}
