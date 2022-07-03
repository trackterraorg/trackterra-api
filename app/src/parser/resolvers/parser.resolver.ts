import { Resolver, Query } from '@nestjs/graphql';
import {
  SupportedProtocolRequestObject,
  SupportedProtocolResponseObject,
} from './dto';
import { ParserService } from '../parser.service';

@Resolver()
export class ParserResolver {
  constructor(private readonly parserService: ParserService) {}

  @Query(() => [SupportedProtocolResponseObject], { nullable: true })
  async supportedProtocols(
    request: SupportedProtocolRequestObject,
  ): Promise<SupportedProtocolResponseObject[]> {
    return await this.parserService.supportedProtocols(request);
  }
}
