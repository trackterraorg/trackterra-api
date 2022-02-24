import { TxInfo } from '@terra-money/terra.js';
import _ = require('lodash');
import { ProtocolType } from '../loader';
import { IParsedTx, IAmount, TxLabel, TxTag } from '../parser';
import { isTxInitiator } from '../utils';

interface ExportableData {
  txInfo: TxInfo,
  walletAddress: string;
  txs: {
    txIndex: number;
    records: IParsedTx[];
  }[];
  fees: IAmount[] | undefined;
  taxes: (IAmount | undefined)[] | undefined;
}

export class Exporter {
  public static format(data: ExportableData) {
    const { txInfo, walletAddress, txs, fees, taxes } = data;

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

    if(isTxInitiator(walletAddress, txInfo)) {
      // Add fees to first tx/event
      if (records.length > 0) {
      
        const fee = fees?.shift();
  
        const firstTx = _.first(records);
  
        /**
         * Sometimes the tx is untaxed. Therefore we only need to 
         * report the tx fee. This is the only way supported by
         * koinly
         */
        if (! (firstTx.sentAmount || firstTx.receivedAmount)) {
          firstTx.sentAmount = fee?.amount;
          firstTx.sentToken = fee?.token;
        } else {
          firstTx.feeAmount = fee?.amount;
          firstTx.feeToken = fee?.token;
        }
  
        records[0] = firstTx;
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
    }

    // calculate networth
    let netWorthAmount: number;
    records = records.map((record: any) => {
      if(record.label === TxLabel.Swap) {
        if (! netWorthAmount) {
          if (record.sentToken === 'uusd') {
            netWorthAmount = record.sentAmount;
          } else if (record.receivedToken === 'uusd') {
            netWorthAmount = record.receivedAmount;
          }
        }

        if (netWorthAmount) {
          record.netWorthAmount = netWorthAmount;
          record.netWorthToken = 'UST';
        }
      }

      return record;
    });

    return records;
  }
}
