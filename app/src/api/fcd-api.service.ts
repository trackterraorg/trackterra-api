import { ConsulConfig, InjectConfig } from '@nestcloud/config';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConsulFcdConfig } from '@trackterra/common';
import { DEFAULT_FCD_URL, FCDApi } from '@trackterra/core/helpers';

@Injectable()
export class FCDApiService implements OnModuleInit {
  private logger = new Logger(this.constructor.name);
  private _api: FCDApi;

  constructor(@InjectConfig() private readonly config: ConsulConfig) {}

  onModuleInit() {
    const fcdUrl =
      this.config.get<ConsulFcdConfig>('fcd')?.url ?? DEFAULT_FCD_URL;
    this.logger.log(`Fcd: ${fcdUrl}`);
    this._api = new FCDApi(fcdUrl);
  }

  public get api() {
    return this._api;
  }
}
