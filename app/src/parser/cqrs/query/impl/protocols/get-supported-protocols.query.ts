import { IQuery } from '@nestjs/cqrs';
import { SupportedProtocolRequest } from '@trackterra/app/parser/parser.types';

export class GetSupportedProtocolsQuery implements IQuery {
  constructor(public readonly input: SupportedProtocolRequest) {}
}
