import { Injectable } from '@nestjs/common';
import { RpcClient, GrpcClient, Service } from '@nestcloud/grpc';
import { ParserServiceClient } from '@trackterra/proto-schema/parser';
import { SERVICE_LIST } from '../../constants';

@Injectable()
export class ParserRpcClientService {
  @RpcClient({
    service: SERVICE_LIST.parser.consulName,
    package: SERVICE_LIST.parser.package,
    protoPath: SERVICE_LIST.parser.protoPath,
  })
  private readonly client: GrpcClient;

  @Service(SERVICE_LIST.parser.service, {
    service: SERVICE_LIST.parser.consulName,
    package: SERVICE_LIST.parser.package,
    protoPath: SERVICE_LIST.parser.protoPath,
  })
  public svc: ParserServiceClient<any>;
}
