import { ContractRpcClientService } from '@trackterra/core';
import { TTOutput } from '@trackterra/parser';
import { Currency } from '@trackterra/proto-schema/contract';
import { CreateTxRequest } from '@trackterra/proto-schema/wallet';
import _ = require('lodash');

export async function txToTxCreateRequest(
  tx: TTOutput,
  walletAddress: string,
  currencyRpcClientService: ContractRpcClientService,
): Promise<CreateTxRequest> {
  const { blockHeight, timestamp } = tx;

  const modifiers = {
    walletAddress,
    blockHeight: parseFloat(blockHeight),
    timestamp: new Date(timestamp),
  };

  const txKeys = [
    { token: 'sentToken', contract: 'sentTokenContract', amount: 'sentAmount'},
    { token: 'receivedToken', contract: 'receivedTokenContract', amount: 'receivedAmount' },
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

        const nullIndex = (! isNaN(Number(currency?.nullIndex))) ? `_${currency.nullIndex}` : '';

        modifiers[txKey.token] = currency.symbol + nullIndex;
        modifiers[txKey.amount] = tokenValue(currency, amount);

        if (! currency.isStable) {
          if (Object.keys(txKey).includes('contract')) {
            modifiers[txKey.contract] = currency.identifier;
          }
        }
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
  
  if (isNaN(amount)) {
    return undefined;
  }

  if (typeof amount === 'string') {
    amount = amount as unknown as number;
  }

  return amount / Math.pow(10, currency.decimals);
}
