import {
  CacheStore,
  CACHE_MANAGER,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import _ = require('lodash');
import stableCoins from './stable-coins';
import { CurrencyRepository } from '@trackterra/repository';

@Injectable()
export class CurrenciesSeeder implements OnModuleInit {
  logger = new Logger(this.constructor.name);

  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async seedStableCoins() {
    const hasStableCoins = await this.currencyRepository.find({
      limit: stableCoins.length,
      conditions: {},
    });

    if (hasStableCoins && hasStableCoins.length > 0) {
      return;
    }

    for (const stableCoin of stableCoins) {
      try {
        const stableCoinExist = await this.currencyRepository.findOne({
          chain: stableCoin.chain,
          symbol: stableCoin.symbol,
        });

        if (stableCoinExist) {
          continue;
        }

        await this.currencyRepository.create({ ...stableCoin });
      } catch (e) {
        this.logger.error(e);
      }
    }
  }

  async onModuleInit() {
    this.seedStableCoins();
  }
}
