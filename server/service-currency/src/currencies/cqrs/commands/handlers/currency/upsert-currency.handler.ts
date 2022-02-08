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
import { lpTokenSplitter } from '@trackterra/parser/utils';

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

      if(! _.isEmpty(currency)) {
        return { currency };
      }

      if(identifier.indexOf(',') === -1) {
        return {
          currency: await this.upsertCurrency(identifier)
        };
      }

      const tokenSymbols = [];
      const tokens = lpTokenSplitter(identifier)?.tokens;

      for (const token of tokens) {
        const result = await this.upsertCurrency(token);
        tokenSymbols.push(result.symbol);
      }
      
      const lpTokenName = tokenSymbols.join("-") + "_LP";

      const lpToken = await this.currencyRepository.create({
        name: lpTokenName,
        symbol: lpTokenName,
        identifier,
        icon: '',
        decimals: 6,
      });

      return {
        currency: lpToken as unknown as Currency,
      };
    } catch (error) {
      this.logger.error(error);
      throw new RpcException(error);
    }

  }

  private async upsertCurrency (identifier: string): Promise<CurrencyEntity> {

    let currency: CurrencyEntity = await this.currencyRepository.findOne({
      identifier,
    });

    if (currency) {
      return currency;
    }
    
    const contractInfo: ContractInfo = await this.fcd.api.getContractInfo(identifier);

    const currFromFcd: Partial<Currency> = contractInfo?.init_msg

    currency = await this.currencyRepository.create({
      name: currFromFcd?.name,
      symbol: currFromFcd?.symbol,
      decimals: currFromFcd?.decimals ?? 6,
      icon: '',
      identifier,
    });

    return currency;
  }

}
