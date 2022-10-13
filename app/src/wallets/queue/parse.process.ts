import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueCompleted,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { Chain } from '@trackterra/chains/enums/chain.enum';
import { WalletsService } from '../wallets.service';
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

    await this.parserService.doParse({
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

    this.logger.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueCompleted()
  async onCompleted(job: Job) {
    const { chain, address } = job.data;

    this.eventEmitter.emit('parsing', {
      chain,
      address,
      msg: 'Parsing completed...',
      status: ParsingStatus.DONE,
      numberOfNewParsedTxs: 0,
    });

    this.logger.log(
      `Completed job ${job.id} of type ${job.name} with ${job.returnvalue.numberOfNewParsedTxs}`,
    );
    await job.remove();
  }
}
