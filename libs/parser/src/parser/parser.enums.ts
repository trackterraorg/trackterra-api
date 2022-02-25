export enum TxTag {
  AddLiquidity = 'add_liquidity',
  Cost = 'cost',
  Deposit = 'deposit',
  Fail = 'fail',
  Fee = 'fee',
  GovVote = 'governance_vote',
  Mint = 'mint',
  NativeDelegation = 'native_delegation',
  NativeReward = 'native_claim_rewards',
  PoolDeposit = 'pool_deposit',
  PoolWithdrawal = 'pool_withdrawal',
  RemoveLiquidity = 'remove_liquidity',
  StakingRewards = 'staking_rewards',
  Swap = 'swap',
  Withdraw = 'withdraw',
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
