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
import { TxEntity } from '../entities';

@Injectable()
@MongoEntityRepository({
  name: 'txs',
  indexes: [
    {
      fields: { walletAddress: 1 },
    },
  ],
})
export class TxRepository extends BaseMongoRepository<TxEntity> {
  constructor(
    @InjectClient() private readonly dbc: MongoClient,
    @InjectMongoDB() private readonly db: Db,
    @Inject(CACHE_MANAGER) private readonly cache: CacheStore,
  ) {
    super({ client: dbc, db }, cache, null);
  }

  @Before('CREATE')
  private onSaveData(data: Partial<TxEntity>): Partial<TxEntity> {
    return {
      ...data,
      ...this.onSave(),
    };
  }

  @Before('UPDATE')
  private onUpdateData(data: Partial<any>) {
    return merge(data, this.onUpdate());
  }

  public async countWalletTxs(
    chain: string,
    walletAddress: string,
  ): Promise<number | 0> {
    const collection = await this.collection;
    const c = await collection.countDocuments({
      chain,
      walletAddress,
    });

    return c;
  }

  public async topActiveContracts(chain: string, walletAddress: string) {
    const collection = await this.collection;
    const mostActiveContracts = await collection.aggregate([
      {
        $match: {
          chain,
          walletAddress: walletAddress,
        },
      },
      {
        $group: {
          _id: '$contract',
          contractCount: {
            $count: {},
          },
        },
      },
      {
        $sort: {
          contractCount: -1,
        },
      },
      {
        $match: {
          _id: {
            $ne: null,
          },
        },
      },
      {
        $limit: 5,
      },
    ]);

    const topFiveContracts = [];
    for await (const mostActiveContract of mostActiveContracts) {
      topFiveContracts.push({
        contract: mostActiveContract._id,
        count: mostActiveContract.contractCount,
      });
    }

    return topFiveContracts.reverse();
  }

  public async countUnclassified(
    chain: string,
    walletAddress: string,
  ): Promise<number | 0> {
    const collection = await this.collection;
    const c = await collection.countDocuments({
      chain,
      walletAddress,
      protocol: 'Unclassified',
    });

    return c;
  }

  public async topOperations(chain: string, walletAddress: string) {
    const collection = await this.collection;
    const topOperations = await collection.aggregate([
      {
        $match: {
          chain,
          walletAddress: walletAddress,
        },
      },
      {
        $group: {
          _id: '$label',
          labelCount: {
            $count: {},
          },
        },
      },
      {
        $sort: {
          labelCount: -1,
        },
      },
      {
        $match: {
          _id: {
            $ne: null,
          },
        },
      },
      {
        $limit: 3,
      },
    ]);

    const listOfTopOperations = [];
    for await (const topOperation of topOperations) {
      listOfTopOperations.push({
        operation: topOperation._id,
        count: topOperation.labelCount,
      });
    }

    return listOfTopOperations;
  }
}
