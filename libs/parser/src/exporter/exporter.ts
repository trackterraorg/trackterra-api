import { IParsedTx, IAmount, TxLabel } from '../parser';

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
      records[0].feeAmount = fee?.amount;
      records[0].feeToken = fee?.token;
    }

    // For other fees add new tx
    fees?.forEach((fee) => {
      const lastRecord = records[records.length - 1];
      const { sender, recipient } = lastRecord;

      const newTx: IParsedTx = {} as IParsedTx;
      newTx.label = TxLabel.Fee;
      newTx.sender = sender;
      newTx.recipient = recipient;
      newTx.feeAmount = fee.amount;
      newTx.feeToken = fee.token;

      records = records.concat(newTx);
    });

    return records;
  }
}
