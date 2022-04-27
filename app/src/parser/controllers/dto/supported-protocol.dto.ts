import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SupportedProtocolDto {
  @Expose()
  @ApiProperty()
  protocolName: string;

  @Expose()
  @ApiProperty()
  txType: string;
}
