import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

import { IsEmpty, IsEnum, IsOptional, IsString } from 'class-validator';
import {
  defaultTaxAppName,
  nameOfTaxApps,
} from '@trackterra/tax-apps/utils/utils';
import { PageOptionsDto } from '@trackterra/repository/dtos/page-options.dto';
import { Order } from '@trackterra/repository';
import { defaultChainName, nameOfChains } from '@trackterra/chains/utils/utils';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FindTxsRequestDto extends PageOptionsDto {
  @ApiModelPropertyOptional({
    enum: nameOfChains,
    default: defaultChainName,
  })
  @IsOptional()
  readonly chain: string;

  @ApiModelPropertyOptional({
    enum: nameOfTaxApps,
    default: defaultTaxAppName,
  })
  @IsOptional()
  readonly taxapp: string;

  @ApiModelPropertyOptional()
  @IsString()
  @IsEmpty()
  q: string;

  csv: false;

  @ApiModelPropertyOptional({
    description: 'Optional, sort field',
    type: String,
  })
  @IsString()
  @IsOptional()
  orderBy?: string;

  @ApiModelPropertyOptional({
    enum: ['Asc', 'Desc'],
    default: 'Asc',
  })
  @IsEnum(Order, { each: true })
  @IsOptional()
  order?: string;
}

export class DownloadCsvRequestDto {
  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  filename: string;
}
