import { separateAmountFromToken } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IParsedTx, IParser, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { TransferEngine } from './transfer';

export class MirBorrow implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const openPosition = _.first(args.contractActions.open_position);

    const poolDepositActions = [{
        sender: args.walletAddress,
        recipient: undefined,
        amount: separateAmountFromToken(openPosition.collateral_amount as unknown as string),
      }];

    const poolDepositTx = (new TransferEngine()).process({
      ...args, 
      txType: { ...args.txType, tag: TxTag.PoolDeposit},
      contractActions: undefined,
      transferActions: poolDepositActions,
    });

    const poolWithdrawActions = [{
        sender: undefined,
        recipient: args.walletAddress,
        amount: separateAmountFromToken(openPosition.mint_amount as unknown as string),
      }];

    const poolWithdrawTx = (new TransferEngine()).process({
      ...args, 
      txType: { ...args.txType, tag: TxTag.PoolWithdrawal},
      contractActions: undefined,
      transferActions: poolWithdrawActions,
    });

    return poolDepositTx.concat(poolWithdrawTx);
  }
}

export const MirProtocol = {
  MirBorrow,
};
