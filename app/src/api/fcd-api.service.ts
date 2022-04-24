import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FcdConfig } from '@trackterra/common/interfaces/config.interface';
import { DEFAULT_FCD_URL, FCDApi } from '@trackterra/core/helpers';

@Injectable()
export class FCDApiService implements OnModuleInit {
  private logger = new Logger(this.constructor.name);
  private _api: FCDApi;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const fcdUrl =
      this.configService.get<FcdConfig>('fcd')?.url ?? DEFAULT_FCD_URL;
    this.logger.log(`Fcd: ${fcdUrl}`);
    this._api = new FCDApi(fcdUrl);
  }

  public get api() {
    return this._api;
  }
}
