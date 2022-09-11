import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Chain } from '@trackterra/chains/enums/chain.enum';
import {
  ChainConfig,
  ChainsConfig,
} from '@trackterra/common/interfaces/config.interface';
import { FCDApi } from '@trackterra/core/helpers';

@Injectable()
export class FCDApiService {
  private logger = new Logger(this.constructor.name);
  private _apis: { [x: string]: FCDApi } = {};

  constructor(private readonly configService: ConfigService) {
    Object.keys(Chain).forEach((chain) => {
      const chainConfig: ChainConfig =
        this.configService.get<ChainsConfig>('chains')[chain];
      this._apis[chain] = new FCDApi(chainConfig);
    });
  }

  public api(chain: Chain) {
    return this._apis[chain.toLowerCase()];
  }
}
