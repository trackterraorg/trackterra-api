import { Entity } from '@juicycleff/repo-orm';
import { BaseEntity } from './base-entity';

@Entity({ name: 'wallets' })
export class WalletEntity extends BaseEntity<any> {
  address: string;
  highestParsedBlock: number | 0;
  status: number;
}
