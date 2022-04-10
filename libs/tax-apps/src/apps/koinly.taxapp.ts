import { seperateIndexFromToken, timeToUtc } from '@trackterra/common';
import { ITaxApp } from '../interfaces/base.taxapp.interface';
import { AppAttrType, RowFormatterType } from './app.types';
import { BaseTaxApp } from './base.taxapp';

export class Koinly extends BaseTaxApp implements ITaxApp {
  attributes: AppAttrType[] = [
    {
      id: 'timestamp',
      title: 'Date',
      formatter: (val) => timeToUtc(val.attrValue),
    },
    { id: 'sentAmount', title: 'Sent Amount' },
    {
      id: 'sentToken',
      title: 'Sent Currency',
      formatter: (val) => this.generateTokenName(val.attrValue),
    },
    { id: 'receivedAmount', title: 'Received Amount' },
    {
      id: 'receivedToken',
      title: 'Received Currency',
      formatter: (val) => this.generateTokenName(val.attrValue),
    },
    { id: 'feeAmount', title: 'Fee Amount' },
    {
      id: 'feeToken',
      title: 'Fee Currency',
      formatter: (val) => this.generateTokenName(val.attrValue),
    },
    { id: 'netWorthAmount', title: 'Net Worth Amount' },
    {
      id: 'netWorthToken',
      title: 'Net Worth Currency',
      formatter: (val) => this.generateTokenName(val.attrValue),
    },
    {
      id: 'tag',
      title: 'Label',
      formatter: (val) => this.transformTags(val.attrValue),
    },
    { id: 'friendlyDescription', title: 'Description' },
    { id: 'txhash', title: 'TxHash' },
  ];

  rowFormatter: RowFormatterType = {
    formatter: (row) => {
      return row;
    },
  };

  private transformTags(val: string) {
    if (!val) {
      return '';
    }

    const tagMapper = {
      cost: 'cost',
      fee: 'cost',
      staking_rewards: 'reward',
    };

    if (Object.keys(tagMapper).includes(val)) {
      return tagMapper[val];
    }

    return '';
  }

  private generateTokenName(val: string) {
    if (!val) {
      return;
    }

    const token = seperateIndexFromToken(val);
    if (!token.index) {
      return val;
    }

    return 'NULL' + token.index;
  }
}
