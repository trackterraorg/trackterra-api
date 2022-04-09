import { CoinTracker } from '../apps/cointracker.taxapp';
import { Koinly } from '../apps/koinly.taxapp';
import { Regular } from '../apps/regular.taxapp';
import { CoinLedger } from '../apps/coinledger.taxapp';

export type TaxAppType = Regular | Koinly | CoinTracker | CoinLedger;
