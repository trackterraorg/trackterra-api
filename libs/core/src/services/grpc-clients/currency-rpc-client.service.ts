import { Injectable } from '@nestjs/common';
import { RpcClient, GrpcClient, Service } from '@nestcloud/grpc';
import { CurrencyServiceClient } from '@trackterra/proto-schema/currency';
import { SERVICE_LIST } from '../../constants';

@Injectable()
export class CurrencyRpcClientService {
  @RpcClient({
    service: SERVICE_LIST.currency.consulName,
    package: SERVICE_LIST.currency.package,
    protoPath: SERVICE_LIST.currency.protoPath,
  })
  private readonly client: GrpcClient;

  @Service(SERVICE_LIST.currency.service, {
    service: SERVICE_LIST.currency.consulName,
    package: SERVICE_LIST.currency.package,
    protoPath: SERVICE_LIST.currency.protoPath,
  })
  public svc: CurrencyServiceClient<any>;
}
