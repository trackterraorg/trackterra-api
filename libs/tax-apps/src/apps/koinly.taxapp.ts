import { seperateIndexFromToken, timeToUtc } from '@trackterra/common';
import { TxKoinly } from '@trackterra/proto-schema/wallet';
import { ITaxApp } from '../interfaces/base.taxapp.interface';
import { AppAttrType } from './app.types';
import { BaseTaxApp } from './base.taxapp';

export class Koinly extends BaseTaxApp implements ITaxApp {
  attributes: AppAttrType[] = [
    { id: 'timestamp', title: 'Date', formatter: (val) => timeToUtc(val) },
    { id: 'sentAmount', title: 'Sent Amount' },
    {
      id: 'sentToken',
      title: 'Sent Currency',
      formatter: this.generateTokenName,
    },
    { id: 'receivedAmount', title: 'Received Amount' },
    {
      id: 'receivedToken',
      title: 'Received Currency',
      formatter: this.generateTokenName,
    },
    { id: 'feeAmount', title: 'Fee Amount' },
    {
      id: 'feeToken',
      title: 'Fee Currency',
      formatter: this.generateTokenName,
    },
    { id: 'netWorthAmount', title: 'Net Worth Amount' },
    {
      id: 'netWorthToken',
      title: 'Net Worth Currency',
      formatter: this.generateTokenName,
    },
    { id: 'tag', title: 'Label', formatter: this.transformTags },
    { id: 'friendlyDescription', title: 'Description' },
    { id: 'txhash', title: 'TxHash' },
  ];

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

  txObj() {
    return TxKoinly;
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
