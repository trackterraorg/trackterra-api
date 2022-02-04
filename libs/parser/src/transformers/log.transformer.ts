import { Logger } from '@nestjs/common';
import { TxInfo } from '@terra-money/terra.js';
import { EventTransformer } from '.';
import { TransformedData } from '../transformers';
import { ProtocolType } from '../loader/protocol.interface';

const failedTxData: TransformedData[] = [
  {
    type: ProtocolType.Fail,
    ...({} as any),
  },
];

export class LogTransformer {
  logger = new Logger(this.constructor.name);

  public transform(txInfo: TxInfo): TransformedData[] {
    if (txInfo.code) {
      return failedTxData;
    }

    return this.transformEvents(txInfo);
  }

  private transformEvents(txInfo: TxInfo): TransformedData[] {
    const logs = txInfo.logs;

    if (logs === undefined) {
      return [];
    }

    const eventActions: TransformedData[] = logs
      .map((log) => {
        try {
          const etf: EventTransformer = new EventTransformer();
          return etf.transform(log).getActions();
        } catch (e) {
          this.logger.error(`Could not transform tx ${txInfo.txhash} data`);
        }
      })
      .filter((l) => l != undefined);

    return eventActions || [];
  }
}
