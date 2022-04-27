import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpsertCurrencyInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  identifier: string;
}
