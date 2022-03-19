import { ProtocolType } from '../loader/protocol.interface';
import { IAmount } from '../parser';

export type EventAction = {
  [key: string]: Record<string, unknown>[];
};

export type EventActions = {
  [key: string]: EventAction[];
};

export type TransferAction = {
  recipient: string;
  sender: string;
  amount: IAmount;
  extraParsingInfo?: string;
};

export type TransformedEvents = {
  type: ProtocolType;
  contractActions: EventActions | undefined;
  transferActions: TransferAction[] | undefined;
};

export type TransformedMessages = {
  [key: string]: any;
};

export type TransformedOutput = {
  events: TransformedEvents[];
  messages: TransformedMessages;
};
