import { Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { ParserQuery, SupportedProtocolType } from './types';
import { GqlContext } from '@trackterra/core';
import {
  SupportedProtocol,
  SupportedProtocolsResponse,
} from '@trackterra/proto-schema/parser';

@Resolver()
export class ParserResolver {
  @Query(() => [SupportedProtocolType], { nullable: true })
  async supportedProtocols(
    @Context() ctx: GqlContext,
  ): Promise<SupportedProtocol[]> {
    const result = await ctx?.rpc?.parser?.svc
      .supportedProtocols(ctx)
      .toPromise();

    return result.protocols;
  }
}
