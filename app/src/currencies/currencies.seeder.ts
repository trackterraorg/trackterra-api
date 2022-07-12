import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import _ = require('lodash');
import tokens from './tokens';
import { CurrencyRepository } from '@trackterra/repository';

@Injectable()
export class CurrenciesSeeder implements OnModuleInit {
  logger = new Logger(this.constructor.name);

  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async seedTokens() {
    for (const token of tokens) {
      const { chain, symbol } = token;
      try {
        const tokenExist = await this.currencyRepository.findOne({
          chain,
          symbol,
        });

        if (tokenExist) {
          continue;
        }

        await this.currencyRepository.create({ ...token });
      } catch (e) {
        this.logger.error(e);
      }
    }
  }

  async onModuleInit() {
    this.seedTokens();
  }
}
