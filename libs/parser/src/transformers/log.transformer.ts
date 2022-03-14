import { Logger } from '@nestjs/common';
import { Tx, TxInfo } from '@terra-money/terra.js';
import { EventTransformer } from '.';
import { TransformedEvents } from '../transformers';
import { ProtocolType } from '../loader/protocol.interface';
import _ = require('lodash');
import { TransformedMessages, TransformedOutput } from './transformer.interfaces';

const failedTxData: TransformedEvents[] = [
  {
    type: ProtocolType.Fail,
    ...({} as any),
  },
];

export class LogTransformer {
  logger = new Logger(this.constructor.name);

  public transform(txInfo: TxInfo): TransformedOutput {

    const messages = this.transformMessages(txInfo);

    if (txInfo.code) {
      return {
        events: failedTxData,
        messages,
      }
    }

    return {
      events: this.transformEvents(txInfo),
      messages,
    }
  }

  private transformEvents(txInfo: TxInfo): TransformedEvents[] {
    const logs = txInfo.logs;

    if (_.isEmpty(logs)) {
      return [];
    }

    const eventActions: TransformedEvents[] = logs
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

  private transformMessages(txInfo: TxInfo): TransformedMessages {
    const tx: any = txInfo.tx;
    
    return tx.value.msg.map((msg: any) => {
      return msg.value;
    });
  }
}
