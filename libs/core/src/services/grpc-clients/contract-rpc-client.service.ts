import { Injectable } from '@nestjs/common';
import { RpcClient, GrpcClient, Service } from '@nestcloud/grpc';
import { ContractServiceClient } from '@trackterra/proto-schema/contract';
import { SERVICE_LIST } from '../../constants';

@Injectable()
export class ContractRpcClientService {
  @RpcClient({
    service: SERVICE_LIST.contract.consulName,
    package: SERVICE_LIST.contract.package,
    protoPath: SERVICE_LIST.contract.protoPath,
  })
  private readonly client: GrpcClient;

  @Service(SERVICE_LIST.contract.service, {
    service: SERVICE_LIST.contract.consulName,
    package: SERVICE_LIST.contract.package,
    protoPath: SERVICE_LIST.contract.protoPath,
  })
  public svc: ContractServiceClient<any>;
}
