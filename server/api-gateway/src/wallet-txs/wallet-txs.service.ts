import { Controller } from '@nestjs/common';
import { WalletsRpcClientService } from '@trackterra/core';
import { FindTxsDto } from '@trackterra/repository/dtos/request/find-txs.dto';
import * as _ from 'lodash';
import { queryMapper } from '@trackterra/common';
import { FindTxsResponse } from '@trackterra/proto-schema/wallet';
@Controller()
export class WalletTxsService {
  constructor(private readonly wallet: WalletsRpcClientService) {}

  async getTxs(
    address: string,
    { taxapp, q, page, take, order, orderBy, csv }: FindTxsDto,
  ): Promise<FindTxsResponse> {
    const filter = q ? JSON.stringify(queryMapper(q)) : q;
    const result = await this.wallet.svc
      .findTxs({
        address,
        filter,
        paginate: {
          skip: ((page ?? 1) - 1) * take,
          limit: take,
        },
        orderBy,
        order,
        taxapp,
        csv,
      })
      .toPromise();

    return result;
  }
}
