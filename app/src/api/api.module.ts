import { Module } from '@nestjs/common';
import { FCDApiService } from './fcd-api.service';

@Module({
  providers: [FCDApiService],
  exports: [FCDApiService],
})
export class ApiModule {}
