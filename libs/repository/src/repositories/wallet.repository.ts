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
import { WalletEntity } from '../entities';

@Injectable()
@MongoEntityRepository({
  name: 'wallets',
  indexes: [
    {
      fields: { address: 1 },
      options: { unique: true },
    },
  ],
})
export class WalletRepository extends BaseMongoRepository<WalletEntity> {
  constructor(
    @InjectClient() private readonly dbc: MongoClient,
    @InjectMongoDB() private readonly db: Db,
    @Inject(CACHE_MANAGER) private readonly cache: CacheStore,
  ) {
    super({ client: dbc, db }, cache, null);
  }

  @Before('CREATE')
  private onSaveData(data: Partial<WalletEntity>): Partial<WalletEntity> {
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
