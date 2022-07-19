import { Entity } from '@juicycleff/repo-orm';
import { ObjectID } from 'bson';
import { BaseEntity } from './base-entity';

@Entity({ name: 'txs' })
export class TxEntity extends BaseEntity<any> {
  id!: string | ObjectID;

  txhash: string;
  walletAddress: string;
  blockHeight: number;
  timestamp: Date;
  protocol: string;
  label: string;
  tag: string;

  contract: string;
  sender: string;
  sentAmount: number;
  sentToken: string;
  sentTokenContract: string;
  recipient: string;
  receivedAmount: number;
  receivedToken: string;
  receivedTokenContract: string;
  feeAmount: number;
  feeToken: string;
  taxAmount: number;
  taxToken: string;

  memo: string;
  friendlyDescription: string;
}
