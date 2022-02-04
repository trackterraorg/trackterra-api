import { TxInfo, TxLog, AccAddress } from '@terra-money/terra.js';
import { LogTransformer, TransformedData } from '../transformers/';
import { Parser, TaxParser, FeeParser, IParsedTx, IAmount } from '../parser';
import { Classifier } from '../classifier';
import { Exporter } from '../exporter';
import { TTOutput } from './ttparser.interfaces';
import { InvalidDataException } from '../exceptions';
import { TxType } from '../loader';
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
    const transformedActions: TransformedData[] =
      logTransformer.transform(txInfo);

    let classifiedEvents: {
      transformedData: TransformedData;
      txType: TxType;
    }[] = [];

    for (let index = 0; index < transformedActions.length; index++) {
      const transformedData = transformedActions[index];
      const txType = await Classifier.classify(transformedData);

      // Ignore any event that can not be detected by the classifier
      if (txType === undefined) {
        continue;
      }

      classifiedEvents.push({
        transformedData,
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
      const { txType, transformedData } = classifiedEvents[index];
      const records = Parser.process({
        txType,
        walletAddress,
        ...transformedData,
      });

      if (records.length > 0) {
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
    const fees: IAmount[] | undefined = FeeParser.process(
      tx.value?.fee?.amount,
    );

    const d = {
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
