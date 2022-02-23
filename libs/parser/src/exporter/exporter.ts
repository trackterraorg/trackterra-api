import _ = require('lodash');
import { IParsedTx, IAmount, TxLabel, TxTag } from '../parser';

interface ExportableData {
  txs: {
    txIndex: number;
    records: IParsedTx[];
  }[];
  fees: IAmount[] | undefined;
  taxes: (IAmount | undefined)[] | undefined;
}

export class Exporter {
  public static format(data: ExportableData) {
    const { txs, fees, taxes } = data;

    let records: IParsedTx[] = [];

    // associate tax
    if (taxes) {
      txs.forEach((tx, index) => {
        const tax = taxes[index];
        tx.records[0].taxAmount = tax?.amount;
        tx.records[0].taxToken = tax?.token;
      });
    }

    // Combine txs
    txs.forEach((tx) => {
      tx.records.forEach((record) => {
        records = records.concat(record);
      });
    });

    // Add fees to first tx/event
    if (records.length > 0) {
      const fee = fees?.shift();

      /**
       * Sometimes the tx is untaxed. Therefore we only need to 
       * report the tx fee. This is the only way supported by
       * koinly
       */
      if (! (_.first(records).sentAmount || _.first(records).receivedAmount)) {
        _.first(records).sentAmount = fee?.amount;
        _.first(records).sentToken = fee?.token;
      } else {
        _.first(records).feeAmount = fee?.amount;
        _.first(records).feeToken = fee?.token;
      }
    }

    // For other fees add new tx
    fees?.forEach((fee) => {
      const lastRecord = records[records.length - 1];
      const { sender, recipient } = lastRecord;

      const newTx: IParsedTx = {} as IParsedTx;
      newTx.label = TxLabel.Fee;
      newTx.sender = sender;
      newTx.recipient = recipient;
      newTx.sentAmount = fee.amount;
      newTx.sentToken = fee.token;
      newTx.tag = TxTag.Cost;

      records = records.concat(newTx);
    });

    return records;
  }
}
