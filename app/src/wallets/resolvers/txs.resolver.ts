import { Resolver, Query, Args } from '@nestjs/graphql';
import { WalletsService } from '../wallets.service';
import { TxFilterArgs, TxFilterInput } from './dto/tx-input.object';
import { FindTxsResponseObject } from './dto/tx.object';

@Resolver()
export class TxsResolver {
  constructor(private readonly walletsService: WalletsService) {}

  @Query(() => FindTxsResponseObject)
  async listTxs(@Args() args: TxFilterArgs): Promise<FindTxsResponseObject> {
    const where = JSON.stringify(args.q);
    const result = await this.walletsService.getTxs(args.address, {
      taxapp: args.taxapp,
      q: where,
      csv: false,
      page: 0,
      limit: 0,
    });
    return result;
  }
}
