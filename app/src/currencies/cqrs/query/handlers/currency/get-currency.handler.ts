import { InternalServerErrorException, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CurrencyRepository } from '@trackterra/repository';
import { GetCurrencyQuery } from '../../impl';
import _ = require('lodash');
import {
  Currency,
  FindCurrencyResponse,
} from '@trackterra/proto-schema/contract';
import { utils } from '@juicycleff/repo-orm';
import { BadRequestError } from '@trackterra/common';

@QueryHandler(GetCurrencyQuery)
export class GetCurrencyHandler implements IQueryHandler<GetCurrencyQuery> {
  logger = new Logger(this.constructor.name);
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(query: GetCurrencyQuery): Promise<FindCurrencyResponse> {
    const { input } = query;

    if (!input.filter) {
      throw new BadRequestError('Missing where input');
    }

    try {
      const where = JSON.parse(input.filter);
      const filter = utils.gqlMongoParser(where);
      const currency = await this.currencyRepository.findOne({ ...filter });

      return {
        currency: currency as unknown as Currency,
      };
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(e);
    }
  }
}
