import { Swaps } from './swap';
import { Transfers } from './transfer';
import { Fail } from './fail';
import { FeeOnly } from './fee';
import { Ignore } from './ignore';
import { Minters } from './mint';
import { Rewarders } from './reward';
import { Burners } from './burn';
import { ToBeDefined } from './tobedefined';
import { NotTaxed } from './not-taxed';
import { Farms } from './farm';
import { Earners } from './earns';
import { Liquidates } from './liquidity';
import { Zaps } from './zap';
import { Staking } from './staking';
import { PoolTransfers } from './pool';
import { MirProtocol } from './mir';
import { PrismProtocol } from './prism';
import { GlowProtocol } from './glow';
import { NFTParsers } from './nft';
import { Native } from './native';
import { NexusProtocol } from './nexus';
import { SpecProtocol } from './spec';
import { PylonProtocol } from './pylon';
import { AnchorProtocol } from './anchor';
import { LuartProtocol } from './luart';
import { MarsProtocol } from './mars';
import { EdgeProtocol } from './edge';
import { TerraswapProtocol } from './terraswap';
import { StaderProtocol } from './stader';

export const ParseProcessors = {
  Fail,
  FeeOnly,
  Ignore,
  ToBeDefined,
  NotTaxed,
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
  ...PoolTransfers,
  ...MirProtocol,
  ...NexusProtocol,
  ...PrismProtocol,
  ...GlowProtocol,
  ...SpecProtocol,
  ...PylonProtocol,
  ...AnchorProtocol,
  ...LuartProtocol,
  ...MarsProtocol,
  ...EdgeProtocol,
  ...TerraswapProtocol,
  ...StaderProtocol,
  ...NFTParsers,
  ...Native,
};
