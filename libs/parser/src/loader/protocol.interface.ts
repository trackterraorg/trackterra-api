export enum ProtocolType {
  Native = 'Native',
  Contract = 'Contract',
  Fail = 'Fail',
}
export interface Protocol {
  type: ProtocolType;
  name: string;
  priority: number;
  transactions: TxType[];
}

export interface TxType {
  name: string;
  contract: string;
  classifier: TxClassifier;
  isEliminator?: false;
  tag: string;
  parserClass?: string;
  description?: string;
}

export interface TxClassifier {
  shouldExistAttributes: string[];
  shouldNotExistAttributes: string[];
  contractAddressExtractKeys: {
    mainKey: string;
    contractKey: string;
  };
  ignoreContract: boolean;
  skipForContracts?: string[];
}
