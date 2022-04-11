import { seperateIndexFromToken, timeToUtc } from '@trackterra/common';
import { ITaxApp } from '../interfaces/base.taxapp.interface';
import { AppAttrType, RowFormatterType } from './app.types';
import { BaseTaxApp } from './base.taxapp';

export class CoinTracking extends BaseTaxApp implements ITaxApp {
  attributes: AppAttrType[] = [
    {
      id: 'tag',
      title: 'Type',
      formatter: (val) => this.mapTags(val.attrValue),
    },
    { id: 'receivedAmount', title: 'Buy Amount' },
    {
      id: 'receivedToken',
      title: 'Buy Currency',
      formatter: (val) => seperateIndexFromToken(val.attrValue)?.token,
    },
    { id: 'sentAmount', title: 'Sell Amount' },
    {
      id: 'sentToken',
      title: 'Sell Currency',
      formatter: (val) => seperateIndexFromToken(val.attrValue)?.token,
    },
    { id: 'feeAmount', title: 'Fee' },
    {
      id: 'feeToken',
      title: 'Fee Currency',
      formatter: (val) => seperateIndexFromToken(val.attrValue)?.token,
    },
    {
      id: 'exchange',
      title: 'Exchange',
      formatter: (_val) => '',
    },
    {
      id: 'trade_group',
      title: 'Trade-Group',
      formatter: (_val) => '',
    },
    {
      id: 'friendlyDescription',
      title: 'Comment',
      formatter: (_val) => '',
    },
    {
      id: 'timestamp',
      title: 'Date',
      formatter: (val) => timeToUtc(val.attrValue),
    },
    { id: 'txhash', title: 'TxHash' },
  ];

  rowFormatter: RowFormatterType = {
    formatter: (row) => {
      return row;
    },
  };

  tagMappings = {
    add_liquidity: 'Withdrawal',
    cost: 'Expense',
    deposit: 'Deposit',
    fail: 'Other Fee',
    fee: 'Other Fee',
    governance_vote: 'Other Fee',
    mint: 'Minting',
    native_delegation: 'Withdrawal',
    native_claim_rewards: 'Reward / Bonus',
    pool_deposit: 'Withdrawal',
    pool_withdrawal: 'Deposit',
    remove_liquidity: 'Deposit',
    staking_rewards: 'Reward / Bonus',
    swap: 'Trade',
    withdraw: 'Withdrawal',
  };

  mapTags(tag: string) {
    return this.tagMappings[tag] ?? '';
  }
}
