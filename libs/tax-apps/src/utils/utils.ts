import { upperFirst } from 'lodash';
import { TaxApp } from '../enums/taxapp.enum';

export const nameOfTaxApps = Object.keys(TaxApp)
  .filter((app) => {
    return isNaN(Number(app));
  })
  .map((app) => {
    return upperFirst(app);
  });

export const defaultTaxApp = TaxApp.regular;
export const defaultTaxAppName = upperFirst(TaxApp.regular);
