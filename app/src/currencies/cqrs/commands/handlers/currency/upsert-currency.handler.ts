import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CurrencyEntity, CurrencyRepository } from '@trackterra/repository';
import { UpsertCurrencyCommand } from '../../impl';
import { RpcException } from '@nestjs/microservices';
import _ = require('lodash');
import {
  Currency,
  UpsertCurrencyResponse,
} from '@trackterra/proto-schema/contract';
import { ContractInfo } from '@terra-money/terra.js';
import { tokenCleanUp } from '@trackterra/parser/utils';
import { FCDApiService } from '@trackterra/app/api/fcd-api.service';

@CommandHandler(UpsertCurrencyCommand)
export class UpsertCurrencyHandler
  implements ICommandHandler<UpsertCurrencyCommand>
{
  logger = new Logger(this.constructor.name);

  public constructor(
    private readonly currencyRepository: CurrencyRepository,
    private readonly fcd: FCDApiService,
  ) {}

  async execute(
    command: UpsertCurrencyCommand,
  ): Promise<UpsertCurrencyResponse> {
    this.logger = new Logger(this.constructor.name);
    this.logger.log(`Async ${command.constructor.name}...`);
    const { input } = command;
    try {
      if (input === null || _.isEmpty(input?.identifier)) {
        throw new RpcException('Currency identifier is missing');
      }

      const { identifier } = input;

      const currency = await this.upsertCurrency(tokenCleanUp(identifier));

      return { currency: currency as unknown as Currency };
    } catch (error) {
      console.dir({ 'The error': 'erorroro' }, { depth: 'null' });
      this.logger.error(error);
      throw new RpcException(error);
    }
  }

  private async upsertCurrency(identifier: string): Promise<CurrencyEntity> {
    let currency: CurrencyEntity = await this.currencyRepository.findOne({
      identifier,
    });

    if (currency) {
      return currency;
    }

    try {
      const contractInfo: ContractInfo = await this.fcd.api.getContractInfo(
        identifier,
      );

      const { init_msg: initMsg } = contractInfo;

      if (initMsg?.symbol.toLowerCase() == 'ulp') {
        return await this.getTokenFromULPContract(initMsg.mint.minter);
      }

      const currFromFcd: Partial<Currency> = initMsg;

      return await this.currencyRepository.create({
        name: currFromFcd?.name,
        symbol: currFromFcd?.symbol,
        decimals: currFromFcd?.decimals ?? 6,
        icon: '',
        identifier: identifier,
        isStable: false,
      });
    } catch (e) {
      this.logger.log(e);
    }
  }

  private async getTokenFromULPContract(
    contractAddress: string,
  ): Promise<CurrencyEntity> {
    try {
      const contractInfo: ContractInfo = await this.fcd.api.getContractInfo(
        contractAddress,
      );

      const assets = contractInfo.init_msg.asset_infos
        .map((asset: any): string => {
          const keys = Object.keys(asset);

          if (keys.includes('native_token')) {
            return asset.native_token.denom;
          }

          if (keys.includes('token')) {
            return asset.token.contract_addr;
          }

          if (keys.includes('cw20')) {
            return asset.cw20;
          }

          if (keys.includes('native')) {
            return asset.native;
          }
        })
        .filter((asset: any) => asset != undefined);

      return await this.generateUlpToken(contractAddress, assets);
    } catch (e) {
      this.logger.log(e);
    }
  }

  private async generateUlpToken(
    identifier: string,
    tokens: string[],
  ): Promise<CurrencyEntity> {
    const tokenSymbols = [];

    let currency: CurrencyEntity = await this.currencyRepository.findOne(
      {
        identifier,
      },
      true,
    );

    if (currency) {
      return currency;
    }

    for (const token of tokens) {
      const result = await this.upsertCurrency(token);
      tokenSymbols.push(result.symbol);
    }

    const lpTokenName = tokenSymbols.join('-') + '_LP';

    const lpTokenCount = await this.currencyRepository.countDocuments({
      symbol: {
        $regex: '_LP$',
      },
    });

    return await this.currencyRepository.create({
      name: lpTokenName,
      symbol: lpTokenName,
      nullIndex: lpTokenCount + 1,
      decimals: 6,
      icon: '',
      identifier,
      isStable: false,
    });
  }
}
