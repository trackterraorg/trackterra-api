import { seperateIndexFromToken, timeToUtc } from '@trackterra/common';
import { ITaxApp } from '../interfaces/base.taxapp.interface';
import { AppAttrType, RowFormatterType } from './app.types';
import { BaseTaxApp } from './base.taxapp';

export class ZenLedger extends BaseTaxApp implements ITaxApp {
  attributes: AppAttrType[] = [
    {
      id: 'timestamp',
      title: 'Timestamp',
      formatter: (val) => timeToUtc(val.attrValue),
    },
    {
      id: 'tag',
      title: 'Type',
      formatter: (val) => this.mapTags(val.attrValue),
    },
    { id: 'receivedAmount', title: 'IN Amount' },
    {
      id: 'receivedToken',
      title: 'IN Currency',
      formatter: (val) => seperateIndexFromToken(val.attrValue)?.token,
    },
    { id: 'sentAmount', title: 'Out Amount' },
    {
      id: 'sentToken',
      title: 'Out Currency',
      formatter: (val) => seperateIndexFromToken(val.attrValue)?.token,
    },
    { id: 'feeAmount', title: 'Fee Amount' },
    {
      id: 'feeToken',
      title: 'Fee Currency',
      formatter: (val) => seperateIndexFromToken(val.attrValue)?.token,
    },
    {
      id: 'exchange',
      title: 'Exchange(optional)',
      formatter: (_val) => '',
    },
    {
      id: 'usBased',
      title: 'US Based',
    },
  ];

  rowFormatter: RowFormatterType = {
    formatter: (row) => {
      row['usBased'] = 'No';
      return row;
    },
  };

  tagMappings = {
    add_liquidity: 'Send',
    cost: 'Send',
    deposit: 'Receive',
    fail: 'Send',
    fee: 'Send',
    governance_vote: 'Send',
    mint: 'Receive',
    native_delegation: 'Send',
    native_claim_rewards: 'Receive',
    pool_deposit: 'Send',
    pool_withdrawal: 'Receive',
    remove_liquidity: 'Receive',
    staking_rewards: 'Receive',
    swap: 'Trade',
    withdraw: 'Send',
  };

  mapTags(tag: string) {
    return this.tagMappings[tag] ?? '';
  }
}
