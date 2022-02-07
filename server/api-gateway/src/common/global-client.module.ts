import { Global, Module } from '@nestjs/common';
import {
  GlobalClientService,
  ParserRpcClientService,
  WalletsRpcClientService,
  CurrencyRpcClientService,
} from '@trackterra/core';

@Global()
@Module({
  providers: [
    GlobalClientService,
    ParserRpcClientService,
    WalletsRpcClientService,
    CurrencyRpcClientService,
  ],
  exports: [
    GlobalClientService,
    ParserRpcClientService,
    WalletsRpcClientService,
    CurrencyRpcClientService,
  ],
})
export class GlobalClientModule {}
