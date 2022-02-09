export enum TxTag {
  Delegate = 'delegate',
  Fail = 'fail',
  Fee = 'fee',
  Mint = 'mint',
  PoolDeposit = 'pool_deposit',
  PoolWithdrawal = 'pool_withdrawal',
  RemoveLiquidity = 'remove_liquidity',
  StakingRewards = 'staking_rewards',
  Swap = 'swap',
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
