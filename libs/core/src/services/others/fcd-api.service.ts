import { ConsulConfig, InjectConfig } from '@nestcloud/config';
import { Injectable } from '@nestjs/common';
import { ConsulFcdConfig } from '@trackterra/common';
import { FCDApi } from '@trackterra/core/helpers';

@Injectable()
export class FCDApiService {
  private readonly _api: FCDApi;

  constructor(@InjectConfig() private readonly config: ConsulConfig) {
    const fcdUrl = this.config.get<ConsulFcdConfig>('fcd');
    this._api = new FCDApi(fcdUrl);
  }

  public get api() {
    return this._api;
  }
}
