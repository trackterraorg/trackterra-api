import {
  ReadWalletDetailResponseDto,
  ReadWalletResponseDto,
  WalletDto,
} from './controllers/dto/wallet.dto';
import {
  ReadWalletDetailRequestDto,
  ReadWalletRequestDto,
} from './controllers/dto/wallet-input.dto';
import {
  ReadWalletDetailRequestObject,
  ReadWalletDetailResponseObject,
  ReadWalletRequestObject,
  ReadWalletResponseObject,
  WalletObject,
} from './resolvers/dto';
import {
  FindTxsResponseDto,
  TxDto,
  TxExtraDto,
  TxNodeDto,
} from './controllers/dto/tx.dto';
import {
  TxExtraObject,
  TxNodeObject,
  TxObject,
} from './resolvers/dto/tx.object';
import { ParsingStatus } from '@trackterra/repository/enums/parsing-status.enum';
import { FindTxsRequestDto } from './controllers/dto/tx-input';

export type Wallet = WalletObject | WalletDto;

export type ReadWalletRequest = ReadWalletRequestObject | ReadWalletRequestDto;
export type ReadWalletResponse =
  | ReadWalletResponseObject
  | ReadWalletResponseDto;

export type ReadWalletDetailRequest =
  | ReadWalletDetailRequestObject
  | ReadWalletDetailRequestDto;
export type ReadWalletDetailResponse =
  | ReadWalletDetailResponseObject
  | ReadWalletDetailResponseDto;

export type Tx = TxDto | TxObject;
export type TxExtra = TxExtraDto | TxExtraObject;
export type TxNode = TxNodeDto | TxNodeObject;

export type CreateTxsRequest = {
  txs: Tx[];
};

export type CreateTxsResponse = {
  status: ParsingStatus;
};

export type UpdateWalletRequest = {
  highestParsedBlock: number;
  status: number;
  address: string;
};

export type UpdateWalletResponse = {
  wallet: Wallet | undefined;
};

export type FindTxsRequest = FindTxsRequestDto;

export type FindTxsResponse = FindTxsResponseDto;
