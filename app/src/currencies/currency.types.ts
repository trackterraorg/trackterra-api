import { UpsertCurrencyInput as RUpsertCurrencyInput } from './controllers/dto/currency-input.dto';
import { CurrencyResponseDto } from './controllers/dto/currency.dto';
import { CurrencyObject } from './resolvers/dto';
import { UpsertCurrencyInput as GUpsertCurrencyInput } from './resolvers/dto/currency.input';

export type UpsertCurrencyRequest = RUpsertCurrencyInput | GUpsertCurrencyInput;
export type UpsertCurrencyResponse =
  | CurrencyResponseDto
  | CurrencyObject
  | undefined;

export type CurrencyResponse = CurrencyResponseDto | CurrencyObject;
