import { CACHE_MANAGER, CacheStore, Inject, Injectable } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { merge } from 'lodash';
import {
  BaseMongoRepository,
  Before,
  MongoEntityRepository,
  InjectClient,
  InjectMongoDB,
} from '@juicycleff/repo-orm';
import { CurrencyEntity } from '../entities';

@Injectable()
@MongoEntityRepository({
  name: 'currencies', 
  indexes: [
    {
      fields: { symbol: 1 },
    },
    {
      fields: { identifier: 1 },
    },
  ],
})
export class CurrencyRepository extends BaseMongoRepository<CurrencyEntity> {
  constructor(
    @InjectClient() private readonly dbc: MongoClient,
    @InjectMongoDB() private readonly db: Db,
    @Inject(CACHE_MANAGER) private readonly cache: CacheStore,
  ) {
    super({ client: dbc, db }, cache, null);
  }

  @Before('CREATE')
  private onSaveData(data: Partial<CurrencyEntity>): Partial<CurrencyEntity> {
    return {
      ...data,
      ...this.onSave(),
    };
  }

  @Before('UPDATE')
  private onUpdateData(data: Partial<any>) {
    return merge(data, this.onUpdate());
  }
}
