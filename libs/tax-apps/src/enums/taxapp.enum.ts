import { registerEnumType } from '@nestjs/graphql';

export enum TaxApp {
  coinledger = 'coinledger',
  cointracker = 'cointracker',
  cointracking = 'cointracking',
  cryptotaxcalculator = 'cryptotaxcalculator',
  koinly = 'koinly',
  regular = 'regular',
  zenledger = 'zenledger',
}

registerEnumType(TaxApp, {
  name: 'TaxAppField',
  description: 'Supported tax applications field',
});
