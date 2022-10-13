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

@Processor('parser_queue')
export class ParserProcess {
  private readonly logger = new Logger(this.constructor.name);
  constructor(private readonly parserService: ParserService) {}

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
    this.logger.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueCompleted()
  async onCompleted(job: Job) {
    this.logger.log(
      `Completed job ${job.id} of type ${job.name} with ${job.returnvalue.numberOfNewParsedTxs}`,
    );
    await job.remove();
  }
}
