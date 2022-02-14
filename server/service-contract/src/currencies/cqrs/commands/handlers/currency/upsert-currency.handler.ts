import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import {
  CurrencyEntity,
  CurrencyRepository,
} from '@trackterra/repository';
import { UpsertCurrencyCommand } from '../../impl';
import { RpcException } from '@nestjs/microservices';
import _ = require('lodash');
import { Currency, UpsertCurrencyResponse } from '@trackterra/proto-schema/contract';
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

      const tokenSplit = lpTokenSplitter(identifier);

      // leverage cache instead of mongos upsert op
      let currency: CurrencyEntity = await this.currencyRepository.findOne({
        identifier: tokenSplit.identifier,
      });

      if(! _.isEmpty(currency)) {
        return { currency };
      }

      // identifier & contract & token are same 
      if(_.size(tokenSplit.tokens) === 1) {
        currency = await this.upsertCurrency(tokenSplit.identifier);
      } else {
        currency = await this.generateUlpToken(tokenSplit.identifier, tokenSplit.tokens);
      }

      return {  currency: currency as unknown as Currency};
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
      let contractAddress = '';
      let contractKeys = Object.keys(initMsg);

      if(contractKeys.includes("init_hook")) {
        contractAddress = initMsg.init_hook.contract_addr;
      }

      if(contractKeys.includes("mint")) {
        contractAddress = initMsg.mint.minter;
      }

      return await this.getTokenFromULPContract(contractAddress);
    }

    const currFromFcd: Partial<Currency> = initMsg;

    return await this.currencyRepository.create({
      name: currFromFcd?.name,
      symbol: currFromFcd?.symbol,
      decimals: currFromFcd?.decimals ?? 6,
      icon: '',
      identifier: identifier,
    });
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
    }).filter((asset: any) => asset != undefined);

    return await this.generateUlpToken(contractAddress, assets);
  }

  private async generateUlpToken(identifier: string, tokens: string[]) : Promise<CurrencyEntity>{

    const tokenSymbols = [];
    
    let currency: CurrencyEntity = await this.currencyRepository.findOne({
      identifier,
    }, true);

    if (currency) {
      return currency;
    }

    for (const token of tokens) {
      const result = await this.upsertCurrency(token);
      tokenSymbols.push(result.symbol);
    }
    
    const lpTokenName = tokenSymbols.join("-") + "_LP";

    const lpTokenCount = await this.currencyRepository.countDocuments({symbol: {
        "$regex": "_LP$"
      }
    });

    return await this.currencyRepository.create({
      name: lpTokenName,
      symbol: lpTokenName,
      nullIndex: lpTokenCount + 1,
      decimals: 6,
      icon: '',
      identifier,
    });
  }

}
