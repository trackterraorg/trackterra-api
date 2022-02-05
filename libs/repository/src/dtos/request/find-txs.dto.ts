import { IntersectionType, PartialType } from '@nestjs/swagger';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { TaxApp } from '@trackterra/repository/enums/taxapp.enum';
import { PageOptionsDto } from '../page-options.dto';
// import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  Min,
  IsOptional,
  Max,
  IsString,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';

export class FindTxs {
  @ApiModelPropertyOptional({
    enum: Object.values(TaxApp),
    default: TaxApp.regular,
  })
  @IsEnum(TaxApp)
  // @IsNotEmpty()
  readonly taxapp: TaxApp = TaxApp.regular;

  // @ApiModelProperty()
  // @IsBoolean()
  // // @IsNotEmpty()
  csv: false;
}

export class FindTxsDto extends IntersectionType(FindTxs, PageOptionsDto) {}
