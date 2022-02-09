import { Global, Module } from '@nestjs/common';
import {
  GlobalClientService,
  ParserRpcClientService,
  WalletsRpcClientService,
  ContractRpcClientService,
} from '@trackterra/core';

@Global()
@Module({
  providers: [
    GlobalClientService,
    ParserRpcClientService,
    WalletsRpcClientService,
    ContractRpcClientService,
  ],
  exports: [
    GlobalClientService,
    ParserRpcClientService,
    WalletsRpcClientService,
    ContractRpcClientService,
  ],
})
export class GlobalClientModule {}
