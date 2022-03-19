import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCurrenciesQuery } from '../../impl';
import { RpcException } from '@nestjs/microservices';
import { CurrencyRepository } from '@trackterra/repository';
import {
  Currency,
  FindCurrenciesResponse,
} from '@trackterra/proto-schema/contract';

@QueryHandler(GetCurrenciesQuery)
export class GetCurrenciesHandler implements IQueryHandler<GetCurrenciesQuery> {
  logger = new Logger(this.constructor.name);

  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(query: GetCurrenciesQuery): Promise<FindCurrenciesResponse> {
    this.logger = new Logger(this.constructor.name);
    this.logger.log(`Async ${query.constructor.name}...`);

    try {
      const currencies = await this.currencyRepository.find();
      return {
        currencies: currencies as unknown as Currency[],
      };
    } catch (e) {
      this.logger.error(e);
      throw new RpcException(e);
    }
  }
}
