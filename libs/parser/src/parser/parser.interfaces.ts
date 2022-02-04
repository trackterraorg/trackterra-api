import { ParserProcessArgs } from './args';

export interface IParser {
  process: (args: ParserProcessArgs) => IParsedTx[];
}

export interface IParsedTx {
  label: string;
  tag: string;
  walletAddress: string;
  contract?: string;
  sender?: string;
  sentAmount?: string;
  sentToken?: string;
  recipient?: string;
  receivedAmount?: string;
  receivedToken?: string;
  feeAmount?: string;
  feeToken?: string;
  taxAmount?: string;
  taxToken?: string;
  friendlyDescription?: string;
}

export interface IAmount {
  token: string;
  amount: string;
}

export interface ISwapAction {
  contract: string;
  sender: string;
  receiver: string;
  offer_asset: string;
  ask_asset: string;
  offer_amount: string;
  return_amount: string;
  tax_amount?: string;
  spread_amount?: string;
  commission_amount?: string;
}
