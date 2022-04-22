import { Global, Module } from '@nestjs/common';
import {
  GlobalClientService,
  ParserRpcClientService,
  ContractRpcClientService,
} from '@trackterra/core';

@Global()
@Module({
  providers: [
    GlobalClientService,
    ParserRpcClientService,
    ContractRpcClientService,
  ],
  exports: [
    GlobalClientService,
    ParserRpcClientService,
    ContractRpcClientService,
  ],
})
export class GlobalClientModule {}
