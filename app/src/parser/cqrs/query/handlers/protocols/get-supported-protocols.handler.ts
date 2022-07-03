import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSupportedProtocolsQuery } from '../../impl';
import _ = require('lodash');
import { ProtocolLoader } from '@trackterra/parser/loader';
import { SupportedProtocolRequest } from '@trackterra/app/parser/parser.types';

@QueryHandler(GetSupportedProtocolsQuery)
export class GetSupportedProtocolsHandler
  implements IQueryHandler<GetSupportedProtocolsQuery>
{
  logger = new Logger(this.constructor.name);
  constructor() {}

  async execute(
    query: GetSupportedProtocolsQuery,
  ): Promise<SupportedProtocolRequest[]> {
    this.logger.log(`Async ${query.constructor.name}...`);

    const { chain } = query.input;

    if (_.isEmpty(chain)) {
      throw new BadRequestException('Please provide valid chain!');
    }

    try {
      const protocolLoader = await ProtocolLoader.getInstance();

      const supportedProcols = [];
      protocolLoader.protocols
        .filter((protocol: any) => {
          return !['Fail', 'Unclassified'].includes(protocol.name);
        })
        .filter((protocol: any) => {
          return protocol.chain === chain;
        })
        .forEach((protocol) => {
          const protocolName = protocol.name;
          protocol.transactions.forEach((txType) => {
            supportedProcols.push({
              protocolName,
              txType: txType.name,
            });
          });

          return supportedProcols;
        });

      return supportedProcols;
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
