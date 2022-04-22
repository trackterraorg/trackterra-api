import { Global, Module } from '@nestjs/common';
import { GlobalClientService } from '@trackterra/core';

@Global()
@Module({
  providers: [GlobalClientService],
  exports: [GlobalClientService],
})
export class GlobalClientModule {}
