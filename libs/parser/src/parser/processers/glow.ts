import { separateAmountFromToken } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IAmount, IParsedTx, IParser, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { TransferEngine } from './transfer';

export class PoolWithdrawal implements IParser {

  process(args: ParserProcessArgs): IParsedTx[] {

    const { walletAddress, contractActions } = args;

    const redeemStableTxs = contractActions.redeem_stable.map((cA: any): IParsedTx => {
      return {
        walletAddress: walletAddress,
        label: TxLabel.Deposit,
        receivedAmount: cA.redeem_amount,
        receivedToken: 'uusd',
        tag: TxTag.PoolWithdrawal,
        friendlyDescription: 'glow pool withdrawal',
      }
    });

    const withdrawTxRaw = contractActions?.withdraw_ticket;

    const withdrawFeeTx = withdrawTxRaw.map((fee: any) : IParsedTx => {
      return {
        walletAddress: walletAddress,
        label: TxLabel.Fee,
        sentAmount: fee.instant_withdrawal_fee,
        sentToken: 'uusd',
        tag: TxTag.Cost,
        friendlyDescription: 'Glow withdrawal fee',
      }
    });

    return redeemStableTxs.concat(withdrawFeeTx);
  };
  
}


export const GlowProtocol = {
  PoolWithdrawal,
};
