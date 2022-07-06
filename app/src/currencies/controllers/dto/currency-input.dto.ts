import { ApiProperty } from '@nestjs/swagger';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Chain } from '@trackterra/chains/enums/chain.enum';
import { defaultChainName, nameOfChains } from '@trackterra/chains/utils/utils';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpsertCurrencyInput {
  @ApiModelPropertyOptional({
    enum: nameOfChains,
    default: defaultChainName,
  })
  readonly chain: Chain;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  identifier: string;
}
