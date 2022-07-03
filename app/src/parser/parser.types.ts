import {
  SupportedProtocolRequestDto,
  SupportedProtocolResponseDto,
} from './controllers/dto';
import {
  WalletRequestDto,
  ParseWalletResponseDto,
} from './controllers/dto/parse-wallet.dto';
import {
  SupportedProtocolRequestObject,
  SupportedProtocolResponseObject,
} from './resolvers/dto';
import {
  WalletRequestObject,
  ParseWalletResponseObject,
} from './resolvers/dto/parse-wallet.dto';

export type SupportedProtocolRequest =
  | SupportedProtocolRequestDto
  | SupportedProtocolRequestObject;

export type SupportedProtocolsResponse = (
  | SupportedProtocolResponseDto
  | SupportedProtocolResponseObject
)[];

export type WalletRequest = WalletRequestDto | WalletRequestObject;

export type ParseWalletResponse =
  | ParseWalletResponseDto
  | ParseWalletResponseObject;
