import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { Chain } from '@trackterra/chains/enums/chain.enum';
import { ParserService } from '@trackterra/app/parser/parser.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ParsingStatus } from '@trackterra/repository/enums/parsing-status.enum';
@Processor('parser_queue')
export class ParserProcess {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    private readonly parserService: ParserService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Process()
  async processParsing(
    job: Job<{
      chain: Chain;
      address: string;
      highestParsedBlockHeight: number;
    }>,
  ) {
    if (!job.data) {
      return;
    }

    return await this.parserService.doParse({
      ...job.data,
    });
  }

  @OnQueueActive()
  onActive(job: Job) {
    const { chain, address } = job.data;

    this.eventEmitter.emit('parsing', {
      chain,
      address,
      msg: 'Parsing started...',
      status: ParsingStatus.PARSING,
      numberOfNewParsedTxs: 0,
    });

    this.logger.log(`Processing job ${job.id} for address ${address}`);
  }

  @OnQueueCompleted()
  async onCompleted(job: Job, result: any) {
    const { chain, address } = job.data;

    this.eventEmitter.emit('parsing', {
      chain,
      address,
      msg: `Parsing completed. Number of transactions parsed: ${result.numberOfNewParsedTxs}`,
      status: result.status,
      numberOfNewParsedTxs: result.numberOfNewParsedTxs,
    });

    this.logger.log(
      `Completed job ${job.id} for address ${address}. Number of new txs parsed: ${result.numberOfNewParsedTxs}`,
    );
  }

  @OnQueueFailed()
  async onFailed(job: Job) {
    const { chain, address } = job.data;

    this.eventEmitter.emit('parsing', {
      chain,
      address,
      msg: 'Parsing failed...',
      status: ParsingStatus.FAILED,
      numberOfNewParsedTxs: 0,
    });

    this.logger.log(`Failed job ${job.id} for address ${address}`);
  }
}
