import { CurrencyRpcClientService } from '@trackterra/core';
import { TTOutput } from '@trackterra/parser';
import { Currency } from '@trackterra/proto-schema/currency';
import { CreateTxRequest } from '@trackterra/proto-schema/wallet';
import { CurrencyEntity } from '@trackterra/repository';
import _ = require('lodash');

export async function txToTxCreateRequest(
  tx: TTOutput,
  walletAddress: string,
  currencyRpcClientService: CurrencyRpcClientService,
): Promise<CreateTxRequest> {
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
    let token = tx[txKey.token];
    const amount = tx[txKey.amount];
    if (token && amount) {
      // for creating custom tokens
      try {
        const { currency } = await currencyRpcClientService.svc.upsertCurrency({
          identifier: token
        }).toPromise();

        modifiers[txKey.token] = currency.symbol;
        modifiers[txKey.amount] = tokenValue(currency, amount);
      } catch(e) {
        console.error(e);
      }
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
