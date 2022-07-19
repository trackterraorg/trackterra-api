import { TxInfo } from '@terra-money/terra.js';
import { CurrencyResponse } from '@trackterra/app/currencies/currency.types';
import { Tx } from '@trackterra/app/wallets/wallet.types';
import { Chain } from '@trackterra/chains/enums/chain.enum';
import { TTOutput } from '@trackterra/parser';
import _ = require('lodash');
import { CurrenciesService } from '../../currencies/currencies.service';

export async function txToTxCreateRequest(
  tx: TTOutput,
  chain: Chain,
  walletAddress: string,
  currenciesService: CurrenciesService,
): Promise<Tx> {
  const { blockHeight, timestamp } = tx;

  const modifiers = {
    chain,
    walletAddress,
    blockHeight: parseFloat(blockHeight),
    timestamp: new Date(timestamp),
  };

  const txKeys = [
    { token: 'sentToken', contract: 'sentTokenContract', amount: 'sentAmount' },
    {
      token: 'receivedToken',
      contract: 'receivedTokenContract',
      amount: 'receivedAmount',
    },
    { token: 'taxToken', amount: 'taxAmount' },
    { token: 'feeToken', amount: 'feeAmount' },
  ];

  for (const txKey of txKeys) {
    let token = tx[txKey.token];
    const amount = tx[txKey.amount];
    if (token && amount) {
      // for creating custom tokens
      try {
        const currency = await currenciesService.upsertCurrency({
          chain,
          identifier: token,
        });

        if (currency) {
          const nullIndex = currency?.nullIndex ? `_${currency.nullIndex}` : '';

          modifiers[txKey.token] = currency.symbol + nullIndex;
          modifiers[txKey.amount] = tokenValue(currency, amount);

          if (!currency.isStable) {
            if (Object.keys(txKey).includes('contract')) {
              modifiers[txKey.contract] = currency.identifier;
            }
          }
        } else {
          console.log(`Could not upsert token ${token}`);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  const transformedTx = {
    ...tx,
    ...modifiers,
  };

  return transformedTx as unknown as Tx;
}

export async function txToUnparsedTxCreateRequest(
  chain: Chain,
  walletAddress: string,
  tx: TxInfo,
): Promise<Tx> {
  const { timestamp, height } = tx;

  const transformedTx = {
    chain,
    walletAddress,
    txhash: tx.txhash,
    blockHeight: height as unknown as number,
    timestamp: new Date(timestamp),
    protocol: 'Unparsed',
  };

  return transformedTx as unknown as Tx;
}

export function tokenValue(currency: CurrencyResponse, amount: number): number {
  if (isNaN(amount)) {
    return undefined;
  }

  if (typeof amount === 'string') {
    amount = amount as unknown as number;
  }

  return amount / Math.pow(10, currency.decimals);
}
