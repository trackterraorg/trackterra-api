import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Chain } from '@trackterra/chains/enums/chain.enum';
import { FcdConfig } from '@trackterra/common/interfaces/config.interface';
import { DEFAULT_FCD_URL, FCDApi } from '@trackterra/core/helpers';

@Injectable()
export class FCDApiService implements OnModuleInit {
  private logger = new Logger(this.constructor.name);
  private _apis: { [x: string]: FCDApi } = {};

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const fcdLunaUrl = this.configService.get<FcdConfig>('fcd_luna')?.url;

    const fcdLuncUrl = this.configService.get<FcdConfig>('fcd_lunc')?.url;

    this._apis[Chain.luna] = new FCDApi(fcdLunaUrl);
    this._apis[Chain.lunc] = new FCDApi(fcdLuncUrl);

    this.logger.log(`Luna Fcd: ${fcdLunaUrl}`);
    this.logger.log(`Lunc Fcd: ${fcdLuncUrl}`);
  }

  public api(chain: Chain) {
    return this._apis[chain];
  }
}
