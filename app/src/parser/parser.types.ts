import { SupportedProtocolDto } from './controllers/dto';
import {
  ParseWalletRequestDto,
  ParseWalletResponseDto,
} from './controllers/dto/parse-wallet.dto';
import { SupportedProtocolObject } from './resolvers/dto';
import {
  ParseWalletRequestObject,
  ParseWalletResponseObject,
} from './resolvers/dto/parse-wallet.dto';

export type SupportedProtocolsResponse = (
  | SupportedProtocolDto
  | SupportedProtocolObject
)[];

export type ParseWalletRequest =
  | ParseWalletRequestDto
  | ParseWalletRequestObject;
export type ParseWalletResponse =
  | ParseWalletResponseDto
  | ParseWalletResponseObject;
