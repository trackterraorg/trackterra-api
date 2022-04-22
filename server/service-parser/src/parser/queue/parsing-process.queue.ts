import { Processor, Process, OnQueueCompleted } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { TTParserService } from '@trackterra/core/services/others/parser.service';
import { FCDApiService, WalletsRpcClientService } from '@trackterra/core';
import { PARSING_QUEUE_NAME, QUEUE_PROCESS_IDS } from '../parser.constants';
import _ = require('lodash');
import { TTOutput } from '@trackterra/parser';

@Processor(PARSING_QUEUE_NAME)
export class ParsingProcessQueue {
  private readonly logger = new Logger(this.constructor.name);
  constructor() {}

  @Process(QUEUE_PROCESS_IDS.ParseTx)
  async processParseTx(
    job: Job<{ address: string; highestParsedBlockHeight: number }>,
  ): Promise<{
    txs: TTOutput[];
    address: string;
    newHighestBlockHeight: number;
  }> {
    return null;
  }

  @OnQueueCompleted()
  async processParseTxCompleted(job: Job, result: any) {}
}
