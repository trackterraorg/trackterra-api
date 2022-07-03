import { DoParseHandler } from './do-parse.handler';
import { GetSupportedProtocolsHandler } from '../../../query/handlers/protocols/get-supported-protocols.handler';

export const ParserCommandHandlers = [
  DoParseHandler,
  GetSupportedProtocolsHandler,
];
