import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import {
  CurrencyEntity,
  CurrencyRepository,
} from '@trackterra/repository';
import { UpsertCurrencyCommand } from '../../impl';
import { RpcException } from '@nestjs/microservices';
import _ = require('lodash');
import { Currency, UpsertCurrencyResponse } from '@trackterra/proto-schema/currency';
import { FCDApiService } from '@trackterra/core';
import { ContractInfo } from '@terra-money/terra.js';
import { lpTokenCombiner, lpTokenSplitter } from '@trackterra/parser/utils';

@CommandHandler(UpsertCurrencyCommand)
export class UpsertCurrencyHandler implements ICommandHandler<UpsertCurrencyCommand> {
  logger = new Logger(this.constructor.name);

  public constructor(
    private readonly currencyRepository: CurrencyRepository,
    private readonly fcd: FCDApiService
  ) {}

  async execute(command: UpsertCurrencyCommand): Promise<UpsertCurrencyResponse> {
    this.logger = new Logger(this.constructor.name);
    this.logger.log(`Async ${command.constructor.name}...`);
    const { input } = command;
    try {
      if (input === null || _.isEmpty(input?.identifier)) {
        throw new RpcException('Currency identifier is missing'); 
      }

      const { identifier } = input;

      // leverage cache instead of mongos upsert op
      let currency: CurrencyEntity = await this.currencyRepository.findOne({
        identifier,
      });

      if(! _.isEmpty(currency)) {
        return { currency };
      }

      if(identifier.indexOf(',') === -1) {
        currency = await this.upsertCurrency(identifier);
        return { currency };
      }

      const lpToken = this.generateUlpToken(identifier);
      
      return {
        currency: lpToken as unknown as Currency,
      };
    } catch (error) {
      this.logger.error(error);
      throw new RpcException(error);
    }

  }

  private async upsertCurrency (identifier: string): Promise<CurrencyEntity> {

    let currency: CurrencyEntity = await this.currencyRepository.findOne({
      identifier,
    });

    if (currency) {
      return currency;
    }
    
    const contractInfo: ContractInfo = await this.fcd.api.getContractInfo(identifier);

    const initMsg: any = contractInfo?.init_msg

    if(initMsg?.symbol.toLowerCase() == 'ulp') {
      const currency = await this.getTokenFromULPContract(initMsg.init_hook.contract_addr);
      console.dir(currency, {depth: 'null'});
      return currency;
    }

    const currFromFcd: Partial<Currency> = initMsg;

    currency = await this.currencyRepository.create({
      name: currFromFcd?.name,
      symbol: currFromFcd?.symbol,
      decimals: currFromFcd?.decimals ?? 6,
      icon: '',
      identifier,
    });

    return currency;
  }

  private async getTokenFromULPContract(contractAddress: string): Promise<CurrencyEntity> {
    const contractInfo: ContractInfo = await this.fcd.api.getContractInfo(contractAddress);

    const assets = contractInfo.init_msg.asset_infos.map((asset): string => {
      if(Object.keys(asset).includes("native_token")) {
        return asset.native_token.denom;
      }
      if(Object.keys(asset).includes("token")) {
        return asset.token.contract_addr;
      }
    }).filter(asset => asset != undefined);

    const currency = await this.generateUlpToken(lpTokenCombiner(contractAddress, assets));
    return currency;
  }

  private async generateUlpToken(identifier: string) : Promise<CurrencyEntity>{

    const tokenSymbols = [];
    const tokens = lpTokenSplitter(identifier)?.tokens;

    for (const token of tokens) {
      const result = await this.upsertCurrency(token);
      tokenSymbols.push(result.symbol);
    }
    
    const lpTokenName = tokenSymbols.join("-") + "_LP";

    const lpToken = await this.currencyRepository.create({
      name: lpTokenName,
      symbol: lpTokenName,
      identifier,
      icon: '',
      decimals: 6,
    });

    return lpToken;
  }

}
