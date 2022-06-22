import { upperFirst } from 'lodash';
import { Chain } from '../enums/chain.enum';

export const nameOfChains = Object.keys(Chain)
  .filter((app) => {
    return isNaN(Number(app));
  })
  .map((app) => {
    return upperFirst(app);
  });

export const defaultChain = Chain.luna;
export const defaultChainName = upperFirst(Chain.luna);
