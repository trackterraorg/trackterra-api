import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CurrencyEntity, CurrencyRepository } from '@trackterra/repository';
import { UpsertCurrencyCommand } from '../../impl';
import _ = require('lodash');
import { ContractInfo } from '@terra-money/terra.js';
import { tokenCleanUp } from '@trackterra/parser/utils';
import { FCDApiService } from '@trackterra/app/api/fcd-api.service';
import { UpsertCurrencyResponse } from '@trackterra/app/currencies/currency.types';
import { Chain } from '@trackterra/chains/enums/chain.enum';

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
    const { chain, identifier } = command.input;
    try {
      if (!identifier) {
        throw new BadRequestException('Currency identifier is missing');
      }

      const currency = await this.upsertCurrency(
        chain,
        tokenCleanUp(identifier),
      );

      return currency;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private async upsertCurrency(
    chain: Chain,
    identifier: string,
  ): Promise<CurrencyEntity> {
    let currency: CurrencyEntity = await this.currencyRepository.findOne({
      chain,
      $or: [{ identifier }, { name: identifier }],
    });

    if (currency) {
      return currency;
    }

    try {
      const contractInfo: ContractInfo = await this.fcd
        .api(chain)
        .getContractInfo(identifier);

      const { init_msg: initMsg } = contractInfo;

      if (initMsg?.symbol.toLowerCase() === 'ulp') {
        return await this.getTokenFromULPContract(chain, initMsg.mint.minter);
      }

      return await this.currencyRepository.create({
        chain,
        name: initMsg?.name,
        symbol: initMsg?.symbol,
        decimals: initMsg?.decimals ?? 6,
        icon: '',
        identifier,
        isStable: false,
      });
    } catch (e) {
      this.logger.log(e);
    }
  }

  private async getTokenFromULPContract(
    chain: Chain,
    contractAddress: string,
  ): Promise<CurrencyEntity> {
    try {
      const contractInfo: ContractInfo = await this.fcd
        .api(chain)
        .getContractInfo(contractAddress);

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

      return await this.generateUlpToken(chain, contractAddress, assets);
    } catch (e) {
      this.logger.log(e);
    }
  }

  private async generateUlpToken(
    chain: Chain,
    identifier: string,
    tokens: string[],
  ): Promise<CurrencyEntity> {
    const tokenSymbols = [];

    let currency: CurrencyEntity = await this.currencyRepository.findOne(
      {
        chain,
        identifier,
      },
      true,
    );

    if (currency) {
      return currency;
    }

    for (const token of tokens) {
      const result = await this.upsertCurrency(chain, token);
      tokenSymbols.push(result.symbol);
    }

    const lpTokenName = tokenSymbols.join('-') + '_LP';

    const lpTokenCount = await this.currencyRepository.countDocuments({
      chain,
      symbol: {
        $regex: '_LP$',
      },
    });

    return await this.currencyRepository.create({
      chain,
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
