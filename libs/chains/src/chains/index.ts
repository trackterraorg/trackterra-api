import { Luna } from './luna.chain';
import { Lunc } from './lunc.chain';

export const Chains = {
  Luna,
  Lunc,
};

const chainTypeMap = {
  ...Chains,
};

export const chainClasses = Object.keys(chainTypeMap);

type Keys = keyof typeof chainTypeMap;
export type ChainType = typeof chainTypeMap[Keys];
type ExtractInstanceType<T> = T extends new () => infer R ? R : never;

class ChainFactory {
  static getChain(k: Keys): ExtractInstanceType<ChainType> {
    return new chainTypeMap[k]();
  }
}

export class ChainSelector {
  static select(identifier: string) {
    const chainName = identifier ? identifier.toLowerCase() : 'luna';

    const chain = chainClasses.find((app) => {
      return app.toLowerCase() === chainName;
    });

    return ChainFactory.getChain((chain as unknown as Keys) ?? 'Luna');
  }
}
