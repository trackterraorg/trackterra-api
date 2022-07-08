import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import _ = require('lodash');
import nativeTokens from './native-tokens';
import { CurrencyRepository } from '@trackterra/repository';

@Injectable()
export class CurrenciesSeeder implements OnModuleInit {
  logger = new Logger(this.constructor.name);

  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async seedNativeTokens() {
    const hasNativeTokens = await this.currencyRepository.find({
      limit: nativeTokens.length,
      conditions: {},
    });

    if (hasNativeTokens && hasNativeTokens.length > 0) {
      return;
    }

    for (const nativeToken of nativeTokens) {
      try {
        const nativeTokenExist = await this.currencyRepository.findOne({
          chain: nativeToken.chain,
          symbol: nativeToken.symbol,
        });

        if (nativeTokenExist) {
          continue;
        }

        await this.currencyRepository.create({ ...nativeToken });
      } catch (e) {
        this.logger.error(e);
      }
    }
  }

  async onModuleInit() {
    this.seedNativeTokens();
  }
}
