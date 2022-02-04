import { Processor, Process, OnQueueCompleted } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { TxInfo } from '@terra-money/terra.js';
import { TTParserService } from '@trackterra/core/services/others/parser.service';
import { EventBus } from '@nestjs/cqrs';
import { FCDApiService, WalletsRpcClientService } from '@trackterra/core';
import { PARSING_QUEUE_NAME, QUEUE_PROCESS_IDS } from '../parser.constants';
import _ = require('lodash');
import { TTOutput } from '@trackterra/parser';

@Processor(PARSING_QUEUE_NAME)
export class ParsingProcessQueue {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    private readonly fcdApiService: FCDApiService,
    private readonly parserService: TTParserService,
    private readonly eventBus: EventBus,
    private readonly walletRpcService: WalletsRpcClientService,
  ) {}

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
