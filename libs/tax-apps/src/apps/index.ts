import { Regular } from './regular.taxapp';
import { Koinly } from './koinly.taxapp';
import { CoinTracker } from './cointracker.taxapp';
import { CoinLedger } from './coinledger.taxapp';

export const TaxApps = {
  Regular,
  Koinly,
  CoinTracker,
  CoinLedger,
};

const taxappTypeMap = {
  ...TaxApps,
};

export const taxappClasses = Object.keys(taxappTypeMap);

type Keys = keyof typeof taxappTypeMap;
export type TaxAppType = typeof taxappTypeMap[Keys];
type ExtractInstanceType<T> = T extends new () => infer R ? R : never;

class TaxappFactory {
  static getTaxApp(k: Keys): ExtractInstanceType<TaxAppType> {
    return new taxappTypeMap[k]();
  }
}

export class TaxappSelector {
  static select(name: string) {
    const taxappName = name ? name.toLowerCase() : 'regular';

    const taxapp = taxappClasses.find((app) => {
      return app.toLowerCase() === taxappName;
    });

    return TaxappFactory.getTaxApp((taxapp as unknown as Keys) ?? 'Regular');
  }
}
