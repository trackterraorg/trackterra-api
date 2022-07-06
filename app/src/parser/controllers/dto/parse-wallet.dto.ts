import { ApiProperty } from '@nestjs/swagger';
import { Chain } from '@trackterra/chains/enums/chain.enum';
import { defaultChainName, nameOfChains } from '@trackterra/chains/utils/utils';
import { Exclude, Expose } from 'class-transformer';

export class WalletRequestDto {
  @ApiProperty({
    enum: nameOfChains,
    default: defaultChainName,
  })
  readonly chain: Chain;

  @Expose()
  @ApiProperty()
  address: string;

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
