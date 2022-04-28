import { UpsertCurrencyInput as RUpsertCurrencyInput } from './controllers/dto/currency-input.dto';
import { CurrencyDto } from './controllers/dto/currency.dto';
import { CurrencyObject } from './resolvers/dto';
import { UpsertCurrencyInput as GUpsertCurrencyInput } from './resolvers/dto/currency.input';

export type UpsertCurrencyRequest = RUpsertCurrencyInput | GUpsertCurrencyInput;
export type UpsertCurrencyResponse = CurrencyDto | CurrencyObject | undefined;

export type Currency = CurrencyDto | CurrencyObject;
