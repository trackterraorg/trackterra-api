import { InternalServerErrorException, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCurrenciesQuery } from '../../impl';
import { CurrencyRepository } from '@trackterra/repository';

@QueryHandler(GetCurrenciesQuery)
export class GetCurrenciesHandler implements IQueryHandler<GetCurrenciesQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(query: GetCurrenciesQuery): Promise<{
    currencies: any;
    count: number;
  }> {
    this.logger = new Logger(this.constructor.name);
    this.logger.log(`Async ${query.constructor.name}...`);

    try {
      const currencies = await this.currencyRepository.find();
      const count = await this.currencyRepository.countDocuments({});

      return {
        currencies,
        count,
      };
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(e);
    }
  }
}
