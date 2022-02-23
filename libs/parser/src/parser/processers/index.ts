import { Swaps } from './swap';
import { Transfers } from './transfer';
import { Fail } from './fail';
import { Minters } from './mint';
import { Rewarders } from './reward';
import { Burners } from './burn';
import { ToBeDefined } from './tobedefined';
import { Farms } from './farm';
import { Earners } from './earns';
import { Liquidates } from './liquidity';
import { Zaps } from './zap';
import { Staking } from './staking';
import { Delegate } from './delegate';
import { PoolTransfers } from './pool';
import { MirProtocol } from './mir';
import { PrismProtocol } from './prism';

export const ParseProcessors = {
  Fail,
  ToBeDefined,
  ...Swaps,
  ...Transfers,
  ...Minters,
  ...Rewarders,
  ...Burners,
  ...Farms,
  ...Earners,
  ...Liquidates,
  ...Zaps,
  ...Staking,
  ...Delegate,
  ...PoolTransfers,
  ...MirProtocol,
  ...PrismProtocol,
};
