import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

import { IsEmpty, IsEnum, IsOptional, IsString } from 'class-validator';
import {
  defaultTaxAppName,
  nameOfTaxApps,
} from '@trackterra/tax-apps/utils/utils';
import { PageOptionsDto } from '@trackterra/repository/dtos/page-options.dto';
import { Order } from '@trackterra/repository';

export class FindTxsRequestDto extends PageOptionsDto {
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
  order: string;
}
