import { Entity } from '@juicycleff/repo-orm';
import { BaseEntity } from './base-entity';

@Entity({ name: 'currencies' })
export class CurrencyEntity extends BaseEntity<any> {
  identifier: string;
  presenter: string;
  decimals: number;
  symbol: string;
  name: string;
  icon: string;
}
