import { ApiProperty } from '@nestjs/swagger';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Chain } from '@trackterra/chains/enums/chain.enum';
import { defaultChainName, nameOfChains } from '@trackterra/chains/utils/utils';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class SupportedProtocolRequestDto {
  @ApiModelPropertyOptional({
    enum: nameOfChains,
    default: defaultChainName,
  })
  @IsOptional()
  readonly chain: string;
}

export class SupportedProtocolResponseDto {
  @Expose()
  @ApiProperty({
    enum: nameOfChains,
    default: defaultChainName,
  })
  chain: Chain;

  @Expose()
  @ApiProperty()
  protocolName: string;

  @Expose()
  @ApiProperty()
  txType: string;
}
