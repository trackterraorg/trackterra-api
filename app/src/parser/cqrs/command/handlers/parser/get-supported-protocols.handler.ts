import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GetSupportedProtocolsCommand } from '../../impl';
import * as _ from 'lodash';
import { ProtocolLoader } from '@trackterra/parser/loader';
import { SupportedProtocolsResponse } from '@trackterra/app/parser/parser.types';

/**
 * @class
 * @implements {ICommandHandler<GetSupportedProtocolsCommand>}
 */
@CommandHandler(GetSupportedProtocolsCommand)
export class GetSupportedProtocolsHandler
  implements ICommandHandler<GetSupportedProtocolsCommand>
{
  logger = new Logger(this.constructor.name);

  /**
   * @param command {GetSupportedProtocolsCommand}
   */
  async execute(
    command: GetSupportedProtocolsCommand,
  ): Promise<SupportedProtocolsResponse> {
    this.logger.log(`Async ${command.constructor.name}...`);
    try {
      const protocolLoader = await ProtocolLoader.getInstance();

      const supportedProcols = [];
      protocolLoader.protocols
        .filter((protocol: any) => {
          return !['Fail', 'Unclassified'].includes(protocol.name);
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
