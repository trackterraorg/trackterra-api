import { Resolver, Query } from '@nestjs/graphql';
import { SupportedProtocolObject } from './dto';
import { ParserService } from '../parser.service';

@Resolver()
export class ParserResolver {
  constructor(private readonly parserService: ParserService) {}

  @Query(() => [SupportedProtocolObject], { nullable: true })
  async supportedProtocols(): Promise<SupportedProtocolObject[]> {
    return await this.parserService.supportedProtocols();
  }
}
