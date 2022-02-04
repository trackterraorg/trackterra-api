import { Swaps } from './swap';
import { Transfers } from './transfer';
import { Fail } from './fail';
import { Minters } from './mint';
import { Rewarders } from './reward';
import { Burners } from './burn';
import { ToBeDefined } from './tobedefined';
import { Farms } from './farm';
import { Earners } from './earns';
import { Liquidations } from './liquidation';
import { Zaps } from './zap';
import { Staking } from './staking';
import { Delegate } from './delegate';

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
  ...Liquidations,
  ...Zaps,
  ...Staking,
  ...Delegate,
};
