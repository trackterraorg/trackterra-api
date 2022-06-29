import { Entity } from '@juicycleff/repo-orm';
import { BaseEntity } from './base-entity';

@Entity({ name: 'currencies' })
export class CurrencyEntity extends BaseEntity<any> {
  chain: string;
  name: string;
  symbol: string;
  nullIndex: number;
  decimals: number;
  icon: string;
  identifier: string;
  isStable: boolean;
}
