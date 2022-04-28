import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@trackterra/repository/dtos';
import { Expose, Type } from 'class-transformer';

export class TxDto extends BaseDto {
  @Expose()
  @ApiProperty()
  txhash: string;

  @Expose()
  @ApiProperty()
  blockHeight: string;

  @Expose()
  @ApiProperty()
  timestamp: string;

  @Expose()
  @ApiProperty()
  protocol: string;

  @Expose()
  @ApiProperty()
  label: string;

  @Expose()
  @ApiProperty()
  tag: string;

  @Expose()
  @ApiProperty()
  walletAddress: string;

  @Expose()
  @ApiProperty()
  contract: string;

  @Expose()
  @ApiProperty()
  sender: string;

  @Expose()
  @ApiProperty()
  recipient: string;

  @Expose()
  @ApiProperty()
  receivedAmount: string;

  @Expose()
  @ApiProperty()
  receivedToken: string;

  @Expose()
  @ApiProperty()
  receivedTokenContract: string;

  @Expose()
  @ApiProperty()
  sentAmount: string;

  @Expose()
  @ApiProperty()
  sentToken: string;

  @Expose()
  @ApiProperty()
  sentTokenContract: string;

  @Expose()
  @ApiProperty()
  feeAmount: string;

  @Expose()
  @ApiProperty()
  feeToken: string;

  @Expose()
  @ApiProperty()
  taxAmount: string;

  @Expose()
  @ApiProperty()
  taxToken: string;

  @Expose()
  @ApiProperty()
  netWorthAmount: string;

  @Expose()
  @ApiProperty()
  netWorthToken: string;

  @Expose()
  @ApiProperty()
  memo: string;

  @Expose()
  @ApiProperty()
  friendlyDescription: string;
}

export class TxExtraDto {
  @Expose()
  @ApiProperty()
  sTxHash: string;

  @Expose()
  @ApiProperty()
  rTimestamp: string;

  @Expose()
  @ApiProperty()
  sWalletAddress: string;

  @Expose()
  @ApiProperty()
  sContract: string;

  @Expose()
  @ApiProperty()
  sSender: string;

  @Expose()
  @ApiProperty()
  sRecipient: string;
}

export class TxNodeDto {
  @Expose()
  @Type(() => TxDto)
  @ApiProperty()
  tx: TxDto | undefined;

  @Expose()
  @Type(() => TxExtraDto)
  @ApiProperty()
  extras: TxExtraDto | undefined;
}

export class GetTxsResponseTxs {
  @Expose()
  @Type(() => TxNodeDto)
  @ApiProperty()
  txs: TxNodeDto[];

  @Expose()
  @ApiProperty()
  totalCount: number;

  @Expose()
  @ApiProperty()
  csvFileName: string;
}

export class GetTxsResponseFile {
  @Expose()
  @ApiProperty()
  csvFileName: string;
}
