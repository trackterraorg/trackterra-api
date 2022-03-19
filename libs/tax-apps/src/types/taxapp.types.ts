import { CoinTracker } from '../apps/cointracker.taxapp';
import { Koinly } from '../apps/koinly.taxapp';
import { Regular } from '../apps/regular.taxapp';

export type TaxAppType = Regular | Koinly | CoinTracker;
