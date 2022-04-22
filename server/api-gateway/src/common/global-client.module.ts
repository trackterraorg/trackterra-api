import { Global, Module } from '@nestjs/common';
import {
  GlobalClientService,
  ContractRpcClientService,
} from '@trackterra/core';

@Global()
@Module({
  providers: [GlobalClientService, ContractRpcClientService],
  exports: [GlobalClientService, ContractRpcClientService],
})
export class GlobalClientModule {}
