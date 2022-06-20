import { AggregateRoot } from '@nestjs/cqrs';
import { ChainSelector } from 'libs/chains/src';
import { ObjectID } from 'mongodb';
import { BaseDto } from '../dtos';

export abstract class BaseEntity<
  T extends BaseDto = BaseDto,
> extends AggregateRoot {
  id?: ObjectID | string;

  chain?: string | String = ChainSelector.select('luna').identifier;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date = null;

  deleted?: boolean = false;

  version?: number = null;

  toDtoClass?: new (entity: BaseEntity, options?: any) => T;

  // toDto = (options?: any) => DtoMapperUtils.toDto(this.toDtoClass, this, options);
}
