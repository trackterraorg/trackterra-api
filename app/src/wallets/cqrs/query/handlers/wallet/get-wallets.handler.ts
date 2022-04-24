import { InternalServerErrorException, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { utils } from '@juicycleff/repo-orm';
import { WalletRepository } from '@trackterra/repository';
import { GetWalletsQuery } from '../../impl';
import { FindWalletsResponse, Wallet } from '@trackterra/proto-schema/wallet';

@QueryHandler(GetWalletsQuery)
export class GetWalletsHandler implements IQueryHandler<GetWalletsQuery> {
  logger = new Logger(this.constructor.name);
  walletRepository: WalletRepository;

  async execute(query: GetWalletsQuery): Promise<FindWalletsResponse> {
    this.logger = new Logger(this.constructor.name);
    this.logger.log(`Async ${query.constructor.name}...`);
    const { input, walletRepository } = query;
    this.walletRepository = walletRepository;

    try {
      if (input.filter) {
        const where = JSON.parse(input.filter);
        const filter = utils.gqlMongoParser(where);
        const walletFil = await this.walletRepository.find({
          conditions: { ...filter },
          limit: input.paginate?.limit || 100,
          skip: input.paginate?.skip || 0,
        });

        return {
          wallets: walletFil as unknown as Wallet[],
        };
      }

      const wallets = await this.walletRepository.find();
      return {
        wallets: wallets as unknown as Wallet[],
      };
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(e);
    }
  }
}
