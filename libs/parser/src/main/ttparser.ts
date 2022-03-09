import { TxInfo, TxLog, AccAddress } from '@terra-money/terra.js';
import { LogTransformer, TransformedEvents } from '../transformers/';
import { Parser, TaxParser, FeeParser, IParsedTx, IAmount } from '../parser';
import { Classifier } from '../classifier';
import { Exporter } from '../exporter';
import { TTOutput } from './ttparser.interfaces';
import { InvalidDataException } from '../exceptions';
import { Protocol, ProtocolType, TxType } from '../loader';
import _ = require('lodash');

export class TTParser {
  public static async parse(
    walletAddress: string,
    txInfo: TxInfo,
  ): Promise<TTOutput[] | undefined> {
    if (!AccAddress.validate(walletAddress)) {
      throw new InvalidDataException('wallet address');
    }

    const logTransformer = new LogTransformer();
    const transformedActions: TransformedEvents[] =
      logTransformer.transform(txInfo).events;

    let classifiedEvents: {
      transformedData: TransformedEvents;
      protocol: Protocol;
      txType: TxType;
    }[] = [];

    for (let index = 0; index < transformedActions.length; index++) {
      const transformedData = transformedActions[index];
      const classificationResult = await Classifier.classify(transformedData);

      // Ignore any event that can not be detected by the classifier
      if (classificationResult?.txType === undefined) {
        continue;
      }

      const { protocol, txType } = classificationResult;
      
      classifiedEvents.push({
        transformedData,
        protocol,
        txType,
      });
    }

    if (classifiedEvents.length === 0) {
      return [];
    }

    let txs: {
      txIndex: number;
      records: IParsedTx[];
    }[] = [];

    // The type of event that cancels other events in the txs
    const eliminatorEvent = _.find(classifiedEvents, (classifiedEvents) => {
      return classifiedEvents.txType.isEliminator;
    });

    if (eliminatorEvent) {
      classifiedEvents = [eliminatorEvent];
    }

    for (let index = 0; index < classifiedEvents.length; index++) {
      const { protocol, txType, transformedData } = classifiedEvents[index];

      const allEvents = txType.requiresOtherEvents ? transformedActions : undefined;

      let records = Parser.process({
        txType,
        walletAddress,
        ...transformedData,
        allEvents,
      });

      records = records?.map((record) => {
        record.protocol = protocol.name;
        return record;
      });

      if (records?.length > 0) {
        txs = txs.concat({
          txIndex: index,
          records,
        });
      }
    }

    if (txs.length === 0) {
      return [];
    }

    // tax for each tx, based on log
    const logs: TxLog[] | undefined = txInfo.logs;
    const taxes = logs?.map((log) => {
      if (log) {
        if (log?.log === undefined) {
          return;
        }
        const objTax: any = eval(log.log);
        return TaxParser.process(objTax?.tax);
      }
    });

    const tx: any = txInfo.tx;
    let fees: IAmount[] | undefined = FeeParser.process(
      tx.value?.fee?.amount,
    );

    // is it a fail tx?
    const failedTxRecord = txs.find((tx) => {
      return tx.records.find((rec) => {
        return rec.protocol === 'Fail';
      });
    });

    if (failedTxRecord) {
      const failedTx = _.first(failedTxRecord.records);
      const txAmount = _.first(fees);
      failedTx.sentAmount = txAmount.amount;
      failedTx.sentToken = txAmount.token;      
      fees = undefined;
      failedTxRecord.records = [failedTx];
    }
    
    const d = {
      txInfo,
      walletAddress,
      txs,
      fees,
      taxes,
    };

    const records: IParsedTx[] = Exporter.format(d);

    const result: TTOutput[] = [];

    records.forEach((record) => {
      const { height, txhash, timestamp, tx } = txInfo;

      result.push({
        blockHeight: `${height}`,
        txhash,
        memo: tx.body?.memo,
        timestamp,
        friendlyDescription: undefined,
        ...record,
      });
    });

    return result;
  }
}
