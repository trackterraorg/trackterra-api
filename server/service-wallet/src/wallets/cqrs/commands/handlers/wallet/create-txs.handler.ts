import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TxEntity, TxRepository } from '@trackterra/repository';
import { CreateTxsCommand } from '../../impl';
import { RpcException } from '@nestjs/microservices';
import {
  CreateTxsResponse,
  ParsingStatus,
  Tx,
} from '@trackterra/proto-schema/wallet';
import _ = require('lodash');

@CommandHandler(CreateTxsCommand)
export class CreateTxsHandler implements ICommandHandler<CreateTxsCommand> {
  logger = new Logger(this.constructor.name);

  public constructor(private readonly txRepository: TxRepository) {}

  async execute(command: CreateTxsCommand): Promise<CreateTxsResponse> {
    this.logger = new Logger(this.constructor.name);
    this.logger.log(`Async ${command.constructor.name}...`);
    const { input } = command;

    try {
      if (input === null) {
        // Check to make sure input is not null
        throw new RpcException('Tx data is missing'); // Throw an apollo input error
      }

      const parsedTxs = input.txs;

      const txs = parsedTxs.map((tx) => tx as unknown as TxEntity);

      await this.txRepository.createMany(txs);

      return {
        status: ParsingStatus.DONE,
      };
    } catch (error) {
      this.logger.error(error);
      throw new RpcException(error);
    }
  }
}
