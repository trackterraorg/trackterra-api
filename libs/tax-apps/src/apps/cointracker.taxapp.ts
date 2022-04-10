import { seperateIndexFromToken, timeToUtc } from '@trackterra/common';
import { ITaxApp } from '../interfaces/base.taxapp.interface';
import { AppAttrType, RowFormatterType } from './app.types';
import { BaseTaxApp } from './base.taxapp';

export class CoinTracker extends BaseTaxApp implements ITaxApp {
  attributes: AppAttrType[] = [
    {
      id: 'timestamp',
      title: 'Date',
      formatter: (val) => timeToUtc(val.attrValue),
    },
    { id: 'receivedAmount', title: 'Received Quantity' },
    {
      id: 'receivedToken',
      title: 'Received Currency',
      formatter: (val) => seperateIndexFromToken(val.attrValue)?.token,
    },
    { id: 'sentAmount', title: 'Sent Quantity' },
    {
      id: 'sentToken',
      title: 'Sent Currency',
      formatter: (val) => seperateIndexFromToken(val.attrValue)?.token,
    },
    { id: 'feeAmount', title: 'Fee amount' },
    {
      id: 'feeToken',
      title: 'Fee token',
      formatter: (val) => seperateIndexFromToken(val.attrValue)?.token,
    },
    {
      id: 'tag',
      title: 'Tag',
      formatter: (val) => this.mapTags(val.attrValue),
    },
  ];

  rowFormatter: RowFormatterType = {
    formatter: (row) => {
      return row;
    },
  };

  tagMappings = {
    add_liquidity: '',
    cost: '',
    deposit: '',
    fail: 'lost',
    fee: 'payment',
    governance_vote: 'payment',
    mint: '',
    native_delegation: '',
    native_claim_rewards: 'airdrop',
    pool_deposit: 'staked',
    pool_withdrawal: '',
    remove_liquidity: '',
    staking_rewards: 'airdrop',
    swap: '',
    withdraw: '',
  };

  mapTags(tag: string) {
    return this.tagMappings[tag] ?? '';
  }
}
