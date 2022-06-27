import { ApiProperty } from '@nestjs/swagger';
import { defaultChainName, nameOfChains } from '@trackterra/chains/utils/utils';
import { Expose, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class ReadWalletRequestDto {
  @Expose()
  @ApiProperty({
    enum: nameOfChains,
    default: defaultChainName,
  })
  chain: string;

  @Expose()
  @ApiProperty()
  address: string;
}

export class ReadWalletDetailRequestDto {
  @Expose()
  @ApiProperty({
    enum: nameOfChains,
    default: defaultChainName,
  })
  chain: string;

  @Expose()
  @ApiProperty()
  address: string;
}
