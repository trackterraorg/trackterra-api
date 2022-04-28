import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ParseWalletRequestDto {
  @Expose()
  @ApiProperty()
  address: string;

  @Expose()
  @ApiProperty()
  highestParsedBlockHeight?: number;
}

export class ParseWalletResponseDto {
  @Expose()
  @ApiProperty()
  numberOfNewParsedTxs: number;

  @Expose()
  @ApiProperty()
  status: number;

  @Expose()
  @ApiProperty()
  msg: string;
}
