import { Global, Module } from '@nestjs/common';
import {
  GlobalClientService,
  ParserRpcClientService,
  WalletsRpcClientService,
} from '@trackterra/core';

@Global()
@Module({
  providers: [
    GlobalClientService,
    ParserRpcClientService,
    WalletsRpcClientService,
  ],
  exports: [
    GlobalClientService,
    ParserRpcClientService,
    WalletsRpcClientService,
  ],
})
export class GlobalClientModule {}
