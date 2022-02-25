import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { WalletEntity, WalletRepository } from '@trackterra/repository';
import { GetWalletQuery } from '../../impl';
import { RpcException } from '@nestjs/microservices';
import { ReadWalletResponse, Wallet } from '@trackterra/proto-schema/wallet';
import _ = require('lodash');
import { AccAddress } from '@terra-money/terra.js';
import { fShortenHash, NotFoundRpcException, ValidationRpcException } from '@trackterra/common';

@QueryHandler(GetWalletQuery)
export class CheckWalletHandler implements IQueryHandler<GetWalletQuery> {
  logger = new Logger(this.constructor.name);
  constructor(private readonly walletRepository: WalletRepository) {}

  async execute(query: GetWalletQuery): Promise<ReadWalletResponse> {
    const { input } = query;
    const { address } = input;

    
    if (_.isEmpty(address)) {
      throw new ValidationRpcException('Wallet address required!');
    }

    if (!AccAddress.validate(address)) {
      throw new ValidationRpcException('Please enter a valid address');
    }

    try {
      
      const walletEntity: WalletEntity = await this.walletRepository.findOne(
        { address },
        true,
      );

      if (!walletEntity) {
        throw new NotFoundRpcException('Wallet not parsed. Please parse it first!');
      }

      const wallet = walletEntity as unknown as Wallet;

      const sAddress = fShortenHash(wallet.address);

      return {
        wallet,
        extras: {
          sAddress,
          parsed: _.isEmpty(wallet?.highestParsedBlock),
        },
      };
    } catch (e) {
      this.logger.error(e);
      throw new RpcException(e);
    }
  }
}
