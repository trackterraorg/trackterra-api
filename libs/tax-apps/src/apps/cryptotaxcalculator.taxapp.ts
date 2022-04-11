import { seperateIndexFromToken, timeToUtc } from '@trackterra/common';
import { TxTag } from '@trackterra/parser/parser';
import _ = require('lodash');
import { ITaxApp } from '../interfaces/base.taxapp.interface';
import { AppAttrType, RowFormatterType } from './app.types';
import { BaseTaxApp } from './base.taxapp';

export class CryptoTaxCalculator extends BaseTaxApp implements ITaxApp {
  attributes: AppAttrType[] = [
    {
      id: 'timestamp',
      title: 'Timestamp (UTC)',
      formatter: (val) => timeToUtc(val.attrValue),
    },
    {
      id: 'tag',
      title: 'Type',
      formatter: (val) => this.mapTags(val.attrValue),
    },
    {
      id: 'sentToken',
      title: 'Base Currency',
      formatter: (val) => seperateIndexFromToken(val.attrValue)?.token,
    },
    { id: 'sentAmount', title: 'Base Amount' },
    {
      id: 'receivedToken',
      title: 'Quote Currency (Optional)',
      formatter: (val) => seperateIndexFromToken(val.attrValue)?.token,
    },
    { id: 'receivedAmount', title: 'Quote Amount (Optional)' },
    {
      id: 'feeToken',
      title: 'Fee Currency (Optional)',
      formatter: (val) => seperateIndexFromToken(val.attrValue)?.token,
    },
    { id: 'feeAmount', title: 'Fee Amount (Optional)' },
    { id: 'n_a_1', title: 'From (Optional)' },
    { id: 'n_a_2', title: 'To (Optional)' },
    { id: 'txhash', title: 'ID (Optional)' },
    { id: 'friendlyDescription', title: 'Description (Optional)' },
  ];

  rowFormatter: RowFormatterType = {
    formatter: (row) => {
      if (row.tag !== TxTag.Swap) {
        row.sentToken = !_.isEmpty(row.sentToken)
          ? row.sentToken
          : row.receivedToken;
        row.sentAmount = !_.isEmpty(row.sentAmount)
          ? row.sentAmount
          : row.receivedAmount;
      }

      return row;
    },
  };

  tagMappings = {
    add_liquidity: 'transfer-out',
    cost: 'expense',
    deposit: 'transfer-in',
    fail: 'expense',
    fee: 'expense',
    governance_vote: 'transfer-out',
    mint: 'transfer-in',
    native_delegation: 'transfer-out',
    native_claim_rewards: 'gift',
    pool_deposit: 'transfer-out',
    pool_withdrawal: 'transfer-in',
    remove_liquidity: 'transfer-in',
    staking_rewards: 'staking',
    swap: 'sell',
    withdraw: 'transfer-out',
  };

  mapTags(tag: string) {
    return this.tagMappings[tag] ?? '';
  }
}
