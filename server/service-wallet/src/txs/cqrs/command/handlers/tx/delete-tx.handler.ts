import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { TxRepository } from '@trackterra/repository';
import { TxDeletedEvent } from '@trackterra/core';
import { DeleteTxCommand } from '../../impl';
import { DeleteTxResponse, Tx } from '@trackterra/proto-schema/wallet';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(DeleteTxCommand)
export class DeleteTxHandler implements ICommandHandler<DeleteTxCommand> {
  logger = new Logger(this.constructor.name);
  txRepository: TxRepository;

  public constructor(private readonly eventBus: EventBus) {}

  async execute(command: DeleteTxCommand): Promise<DeleteTxResponse> {
    this.logger = new Logger(this.constructor.name);
    this.logger.log(`Async ${command.constructor.name}...`);
    const { input, txRepository } = command;
    this.txRepository = txRepository;

    try {
      if (!input || input.id === null) {
        // Check to make sure input is not null
        throw new RpcException('Tx id is missing');
      }
      const tx = await this.txRepository.findOne(
        { normalizedName: input.id },
        true,
      );
      if (!tx) {
        throw new RpcException('Tx with id does not exist');
      }

      await this.txRepository.deleteOne({ RpcException: input.id });
      await this.eventBus.publish(new TxDeletedEvent(tx));

      return {
        tx: tx as unknown as Tx,
      };
    } catch (error) {
      this.logger.log(error);
      throw new RpcException(error);
    }
  }
}
