import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@trackterra/repository/dtos';
import { Expose, Type } from 'class-transformer';

export class WalletDto extends BaseDto {
  @Expose()
  @ApiProperty()
  address: string;

  @Expose()
  @ApiProperty()
  highestParsedBlock: number;
}

export class WalletExtrasDto {
  @Expose()
  @ApiProperty()
  sAddress: string;

  @Expose()
  @ApiProperty()
  parsed: boolean;
}

export class TopActiveContractDto {
  @Expose()
  @ApiProperty()
  contract: string;

  @Expose()
  @ApiProperty()
  count: number;
}

export class TopOperationDto {
  @Expose()
  @ApiProperty()
  operation: string;

  @Expose()
  @ApiProperty()
  count: number;
}

export class ReadWalletResponseDto {
  @Expose()
  @ApiProperty()
  wallet: WalletDto | undefined;

  @Expose()
  @ApiProperty()
  extras: WalletExtrasDto | undefined;
}

export class ReadWalletDetailResponseDto {
  @Expose()
  @ApiProperty()
  address: string;

  @Expose()
  @ApiProperty()
  txCount: number;

  @Expose()
  @ApiProperty()
  unclassifiedTxCount: number;

  @Expose()
  @ApiProperty()
  lastParsingTime: string;

  @Expose()
  @ApiProperty()
  highestParsedBlock: number;

  @Expose()
  @Type(() => TopActiveContractDto)
  @ApiProperty()
  topActiveContracts: TopActiveContractDto[];

  @Expose()
  @Type(() => TopOperationDto)
  @ApiProperty()
  topOperations: TopOperationDto[];
}

export class CheckWalletResponseDto {
  @Expose()
  @ApiProperty()
  exist: boolean;

  @Expose()
  @ApiProperty()
  parsed: boolean;
}
