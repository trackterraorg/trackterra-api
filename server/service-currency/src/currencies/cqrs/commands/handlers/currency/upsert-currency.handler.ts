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
import { ContractInfo } from '@terra-money/terra.js';

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

      if(_.isEmpty(currency)) {
        const contractInfo: ContractInfo = await this.fcd.api.getContractInfo(identifier);

        if(contractInfo) {
          const {name, symbol, decimals} = contractInfo.init_msg;
          currency = await this.currencyRepository.create({
            name,
            symbol,
            decimals: decimals ?? 6,
            icon: '',
            identifier,
          })
        }
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
