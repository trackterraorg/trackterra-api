import { ApiProperty } from '@nestjs/swagger';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { defaultChainName, nameOfChains } from '@trackterra/chains/utils/utils';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class WalletRequestDto {
  @ApiModelPropertyOptional({
    enum: nameOfChains,
    default: defaultChainName,
  })
  @IsOptional()
  readonly chain: string;

  @Expose()
  @ApiProperty()
  address: string;

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
