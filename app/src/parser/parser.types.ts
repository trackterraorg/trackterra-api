import { SupportedProtocolResponseDto } from './controllers/dto';
import {
  WalletRequestDto,
  ParseWalletResponseDto,
} from './controllers/dto/parse-wallet.dto';
import { SupportedProtocolObject } from './resolvers/dto';
import {
  WalletRequestObject,
  ParseWalletResponseObject,
} from './resolvers/dto/parse-wallet.dto';

export type SupportedProtocolsResponse = (
  | SupportedProtocolResponseDto
  | SupportedProtocolObject
)[];

export type WalletRequest = WalletRequestDto | WalletRequestObject;

export type ParseWalletResponse =
  | ParseWalletResponseDto
  | ParseWalletResponseObject;
