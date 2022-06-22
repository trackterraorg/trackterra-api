import { ApiProperty } from '@nestjs/swagger';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { defaultChainName, nameOfChains } from '@trackterra/chains/utils/utils';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CurrencyRequestDto {
  @ApiModelPropertyOptional({
    enum: nameOfChains,
    default: defaultChainName,
  })
  @IsOptional()
  readonly chain: string;
}

export class CurrencyResponseDto {
  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  symbol: string;

  @Expose()
  @ApiProperty()
  nullIndex: number;

  @Expose()
  @ApiProperty()
  decimals: number;

  @Expose()
  @ApiProperty()
  icon: string;

  @Expose()
  @ApiProperty()
  identifier: string;

  @Expose()
  @ApiProperty()
  isStable: boolean;
}
