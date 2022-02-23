import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
// import { Type } from 'class-transformer';
// import { IsEnum, IsInt, Min, IsOptional, Max, IsString, IsNotEmpty } from 'class-validator';

import { Order } from '../enums';

export class PageOptionsDto {
  @ApiModelPropertyOptional()
  // @IsString()
  // @IsNotEmpty()
  // @IsOptional()
  readonly orderBy?: string;

  @ApiModelPropertyOptional({
    enum: Object.keys(Order).filter((x) => isNaN(Number(x))),
    default: 'asc',
  })
  // @IsEnum(Order)
  // @IsOptional()
  readonly order: string;

  @ApiModelPropertyOptional({
    minimum: 1,
    default: 1,
  })
  // @Type(() => Number)
  // @IsInt()
  // @Min(1)
  // @IsOptional()
  readonly page: number = 1;

  @ApiModelPropertyOptional({
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  // @Type(() => Number)
  // @IsInt()
  // @Min(10)
  // @Max(50)
  // @IsOptional()
  readonly take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @ApiModelPropertyOptional()
  // @IsString()
  // @IsNotEmpty()
  // @IsOptional()
  readonly q?: string;
}
