export enum TxTag {
  PoolDeposit = 'Pool deposit',
  PoolWithdrawal = 'Pool withdrawal',
  Swap = 'Swap',
  RemoveLiquidity = 'Remove liquidity',
}

export enum TxStatus {
  Success = 'Success',
  Failed = 'Failed',
}

export enum TxLabel {
  Deposit = 'Deposit',
  Delegate = 'Delegate',
  Empty = '',
  Fail = 'Fail',
  Fee = 'Fee',
  Mint = 'Mint',
  Receive = 'Receive',
  Send = 'Send',
  Swap = 'Swap',
  Transfer = 'Transfer',
  ToBeDefined = 'ToBeDefined',
  Withdraw = 'Withdraw',
}

export const txLabelKeys = Object.keys(TxLabel);
