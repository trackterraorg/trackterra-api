import { TTOutput } from '@trackterra/parser';
import { Currency } from '@trackterra/proto-schema/parser';
import { CreateTxRequest } from '@trackterra/proto-schema/wallet';
import { TxEntity } from '@trackterra/repository';
import { CurrenciesService } from '../../currencies/currencies.service';

export function txToTxCreateRequest(
  tx: TTOutput,
  walletAddress: string,
  currencyService: CurrenciesService,
): CreateTxRequest {
  const { blockHeight, timestamp } = tx;

  const modifiers = {
    walletAddress,
    blockHeight: parseFloat(blockHeight),
    timestamp: new Date(timestamp),
  };

  const txKeys = [
    { token: 'sentToken', amount: 'sentAmount' },
    { token: 'receivedToken', amount: 'receivedAmount' },
    { token: 'taxToken', amount: 'taxAmount' },
    { token: 'feeToken', amount: 'feeAmount' },
    { token: 'networthAmount', amount: 'networthToken' },
  ];

  for (const txKey of txKeys) {
    const token = tx[txKey.token];
    const amount = tx[txKey.amount];
    if (token && amount) {
      const currency: Currency = currencyService.findCurrency(token);
      modifiers[txKey.token] = currency.presenter;
      modifiers[txKey.amount] = tokenValue(currency, amount);
    }
  }

  const transformedTx = {
    ...tx,
    ...modifiers,
  };

  return transformedTx as unknown as CreateTxRequest;
}

export function tokenValue(currency: Currency, amount: number): number {
  if (typeof amount === 'string') {
    amount = amount as unknown as number;
  }

  return amount / Math.pow(10, currency.decimals);
}
