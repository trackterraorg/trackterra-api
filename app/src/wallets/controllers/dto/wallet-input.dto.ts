import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ReadWalletRequestDto {
  @Expose()
  @ApiProperty()
  address: string;
}

export class ReadWalletDetailRequestDto {
  @Expose()
  @ApiProperty()
  address: string;
}
