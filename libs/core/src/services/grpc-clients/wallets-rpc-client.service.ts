import { Injectable } from '@nestjs/common';
import { RpcClient, GrpcClient, Service } from '@nestcloud/grpc';
import { WalletServiceClient } from '@trackterra/proto-schema/wallet';
import { SERVICE_LIST } from '../../constants';

@Injectable()
export class WalletsRpcClientService {
  @RpcClient({
    service: SERVICE_LIST.wallet.consulName,
    package: SERVICE_LIST.wallet.package,
    protoPath: SERVICE_LIST.wallet.protoPath,
  })
  private readonly client: GrpcClient;

  @Service(SERVICE_LIST.wallet.service, {
    service: SERVICE_LIST.wallet.consulName,
    package: SERVICE_LIST.wallet.package,
    protoPath: SERVICE_LIST.wallet.protoPath,
  })
  public svc: WalletServiceClient<any>;
}
