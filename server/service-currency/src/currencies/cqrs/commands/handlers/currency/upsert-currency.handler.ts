import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import {
  CurrencyEntity,
  CurrencyRepository,
} from '@trackterra/repository';
import { UpsertCurrencyCommand } from '../../impl';
import { RpcException } from '@nestjs/microservices';
import _ = require('lodash');
import { Currency, UpsertCurrencyResponse } from '@trackterra/proto-schema/currency';
import { FCDApiService } from '@trackterra/core';

@CommandHandler(UpsertCurrencyCommand)
export class UpsertCurrencyHandler implements ICommandHandler<UpsertCurrencyCommand> {
  logger = new Logger(this.constructor.name);

  public constructor(
    private readonly currencyRepository: CurrencyRepository,
    private readonly fcd: FCDApiService
  ) {}

  async execute(command: UpsertCurrencyCommand): Promise<UpsertCurrencyResponse> {
    this.logger = new Logger(this.constructor.name);
    this.logger.log(`Async ${command.constructor.name}...`);
    const { input } = command;

    try {
      if (input === null || _.isEmpty(input?.identifier)) {
        throw new RpcException('Currency identifier is missing'); 
      }

      const { identifier } = input;

      // leverage cache instead of mongos upsert op
      let currency: CurrencyEntity = await this.currencyRepository.findOne({
        identifier,
      });

      if(! currency) {
        const currency = await this.fcd.api.getContractInfo(identifier);
        console.log(currency);
        
        // const parsedTxs = input.txs;
  
        // const txs = parsedTxs.map((tx) => tx as unknown as CurrencyEntity);
  
        // await this.txRepository.createMany(txs);
      }

      return {
        currency: currency as unknown as Currency,
      };
    } catch (error) {
      this.logger.error(error);
      throw new RpcException(error);
    }
  }
}
