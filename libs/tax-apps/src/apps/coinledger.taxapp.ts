import { seperateIndexFromToken, timeToUtc } from '@trackterra/common';
import { ITaxApp } from '../interfaces/base.taxapp.interface';
import { AppAttrType } from './app.types';
import { BaseTaxApp } from './base.taxapp';

export class CoinLedger extends BaseTaxApp implements ITaxApp {
  attributes: AppAttrType[] = [
    {
      id: 'timestamp',
      title: 'Date (UTC)',
      formatter: (val) => timeToUtc(val),
    },
    { id: 'n_a', title: 'Platform (Optional)', formatter: (val) => '' },
    {
      id: 'sentToken',
      title: 'Asset Sent',
      formatter: (val) => seperateIndexFromToken(val)?.token,
    },
    { id: 'sentAmount', title: 'Amount Sent' },
    {
      id: 'receivedToken',
      title: 'Asset Received',
      formatter: (val) => seperateIndexFromToken(val)?.token,
    },
    { id: 'receivedAmount', title: 'Amount Received' },
    {
      id: 'feeToken',
      title: 'Fee Currency (Optional)',
      formatter: (val) => seperateIndexFromToken(val)?.token,
    },
    { id: 'feeAmount', title: 'Fee Amount (Optional)' },
    { id: 'tag', title: 'Type', formatter: (val) => this.mapTags(val) },
    { id: 'friendlyDescription', title: 'Description (Optional)' },
    { id: 'txhash', title: 'TxHash (Optional)' },
  ];

  tagMappings = {
    add_liquidity: 'Withdrawal',
    cost: 'Withdrawal',
    deposit: 'Deposit',
    fail: 'Investment Loss',
    fee: 'Withdrawal',
    governance_vote: 'Withdrawal',
    mint: 'Deposit',
    native_delegation: 'Withdrawal',
    native_claim_rewards: 'Gift Received',
    pool_deposit: 'Withdrawal',
    pool_withdrawal: 'Deposit',
    remove_liquidity: 'Deposit',
    staking_rewards: 'Gift Received',
    swap: 'Trade',
    withdraw: 'Withdrawal',
  };

  mapTags(tag: string) {
    return this.tagMappings[tag] ?? '';
  }
}
