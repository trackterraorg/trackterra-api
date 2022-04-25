import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CurrencyDto {
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

  @ApiProperty()
  identifier: string;

  @Expose()
  @ApiProperty()
  isStable: boolean;
}
