import { Protocol, TxType } from '../loader/protocol.interface';

export type ClassifyOutput = {
  protocol: Protocol;
  txType: TxType;
};
