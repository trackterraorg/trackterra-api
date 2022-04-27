import { SupportedProtocolDto } from './controllers/dto';
import { SupportedProtocolObject } from './resolvers/dto';

export type SupportedProtocolsResponse = (
  | SupportedProtocolDto
  | SupportedProtocolObject
)[];

export type ParseWalletRequest = {
  address: string;
  highestParsedBlockHeight?: number;
};

export type ParseWalletResponse = {
  numberOfNewParsedTxs: number;
  status: number;
  msg: string;
};
