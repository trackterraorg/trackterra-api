import { Resolver, Query } from '@nestjs/graphql';
import { SupportedProtocolType } from './types';
import { SupportedProtocol } from '@trackterra/proto-schema/parser';
import { ParserService } from '../parser.service';

@Resolver()
export class ParserResolver {
  constructor(private readonly parserService: ParserService) {}

  @Query(() => [SupportedProtocolType], { nullable: true })
  async supportedProtocols(): Promise<SupportedProtocol[]> {
    const result = await this.parserService.supportedProtocols();
    return result.protocols;
  }
}
