import { CoinTracker } from '../apps/cointracker.taxapp';
import { Koinly } from '../apps/koinly.taxapp';
import { Regular } from '../apps/regular.taxapp';
import { CoinLedger } from '../apps/coinledger.taxapp';
import { CryptoTaxCalculator } from '../apps/cryptotaxcalculator.taxapp';
import { ZenLedger } from '../apps/zenledger.taxapp';
import { CoinTracking } from '../apps/cointracking.taxapp';

export type TaxAppType =
  | Regular
  | Koinly
  | CoinTracker
  | CoinLedger
  | CryptoTaxCalculator
  | ZenLedger
  | CoinTracking;
