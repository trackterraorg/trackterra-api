export enum TxTag {
  Delegate = 'Delegate',
  Fail = 'Fail',
  Fee = 'Fee',
  Mint = 'Mint',
  PoolDeposit = 'Pool deposit',
  PoolWithdrawal = 'Pool withdrawal',
  RemoveLiquidity = 'Remove liquidity',
  Swap = 'Swap',
}

export enum TxStatus {
  Success = 'Success',
  Failed = 'Failed',
}

export enum TxLabel {
  Deposit = 'Deposit',
  Fail = 'Fail',
  Fee = 'Fee',
  Swap = 'Swap',
  Withdraw = 'Withdraw',
}

export const txLabelKeys = Object.keys(TxLabel);
