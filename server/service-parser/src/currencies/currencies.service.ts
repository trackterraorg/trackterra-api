import {
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { Currency } from '@trackterra/proto-schema/parser';
import * as https from 'https';
import * as csv from 'fast-csv';
import _ = require('lodash');
import stableCoins from './stable-coins';
@Injectable()
export class CurrenciesService implements OnModuleInit {
  logger = new Logger(this.constructor.name);
  DECIMALS = 6;
  currencies: Currency[] = [];

  infos = [
    {
      name: 'tokens',
      identifier: 'mainnet',
      presenter: 'symbol',
      url: 'https://raw.githubusercontent.com/etfinder/assets/master/extra/cw20/tokens.csv',
      data: [],
    },
    {
      name: 'contracts',
      identifier: 'mainnet',
      presenter: 'name',
      url: 'https://raw.githubusercontent.com/etfinder/assets/master/extra/cw20/contracts.csv',
      data: [],
    },
    {
      name: 'coins',
      identifier: 'symbol',
      presenter: 'name',
      url: '',
      data: stableCoins,
    },
  ];

  async seedCurrencies() {
    for (const info of this.infos) {
      let recs: any;
      if (!_.isEmpty(info.url)) {
        recs = await this.fetchData(info.url).then();
      } else {
        recs = info.data;
      }
      const identifier = info.identifier;
      const presenter = info.presenter;
      let currency: Partial<Currency>;

      for (const rec of recs) {
        currency = {};
        currency.decimals = !_.isEmpty(rec?.decimals)
          ? (rec.decimals as unknown as number)
          : this.DECIMALS;
        currency.symbol = rec?.symbol;
        currency.name = rec?.name;
        currency.icon = rec?.icon;
        currency.identifier = rec[identifier];
        currency.presenter = rec[presenter];
        this.currencies.push(currency as unknown as Currency);
      }
    }
  }

  private async fetchData(url: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const obj: any[] = [];
      const request = https.get(url, (response) => {
        if (response.statusCode === 200) {
          response
            .pipe(csv.parse({ headers: true, ignoreEmpty: true }))
            .on('error', (error) => console.error(error))
            .on('data', (row) => {
              obj.push(row);
            })
            .on('end', (rowCount: number) => {
              this.logger.log(`Number of contracts = ${rowCount}`);
              return resolve(obj);
            });
        }

        request.setTimeout(10000, function () {
          request.destroy();
        });
      });
    });
  }

  findCurrency(identifier: string): Currency {
    const currency = this.currencies.find(
      (currency) => currency.identifier == identifier,
    );

    return (
      currency ?? {
        identifier,
        presenter: identifier,
        decimals: this.DECIMALS,
        symbol: '',
        name: '',
        icon: '',
      }
    );
  }

  async onModuleInit() {
    this.seedCurrencies();
  }
}
