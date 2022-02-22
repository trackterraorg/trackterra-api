import { separateAmountFromToken } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IAmount, IParsedTx, IParser, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { MintEngine } from './mint';
import { SwapEngine } from './swap';
import { TransferEngine } from './transfer';

class MirPoolDeposit implements IParser {

  process(args: ParserProcessArgs): IParsedTx[] {

    const contractActions = _.pick(args.contractActions, 'send');
  
    const poolDeposit = (new TransferEngine()).process({
      ...args, contractActions, transferActions: undefined,
    });
    
    const protocolFeeAction = args.contractActions.burn.find((cA) => {
      return Object.keys(cA).includes('protocol_fee');
    });

    let protocolFee: IParsedTx[] = [];
    if (protocolFeeAction) {
      const amt: IAmount = separateAmountFromToken(protocolFeeAction.protocol_fee as unknown as string);
      protocolFee = [{
        walletAddress: args.walletAddress,
        label: TxLabel.Fee,
        sentAmount: amt.amount,
        sentToken: amt.token,
        tag: TxTag.Fee,
        friendlyDescription: args.txType.description,
      }];
    }
    return poolDeposit.concat(protocolFee);
  };
  
}

class MirPoolWithdraw implements IParser {

  process(args: ParserProcessArgs): IParsedTx[] {

    const withdrawAction = _.first(args.contractActions.withdraw);
    const amt = separateAmountFromToken(withdrawAction.withdraw_amount as unknown as string);

    const poolWithdrawal: IParsedTx[] = [{
        walletAddress: args.walletAddress,
        label: TxLabel.Deposit,
        receivedAmount: amt.amount,
        receivedToken: amt.token,
        tag: TxTag.PoolWithdrawal,
        friendlyDescription: args.txType.description,
      }];
    
    return poolWithdrawal;
  };
  
}
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

export class MirOpenShortFarm implements IParser {
  args: ParserProcessArgs;

  openPosition(): IParsedTx {
    const { txType, walletAddress, contractActions } = this.args;
    const openPositionAction = _.first(contractActions.open_position);
    const contract = openPositionAction.contract as unknown as string;
    const { token, amount }: IAmount = separateAmountFromToken(
      openPositionAction.collateral_amount as unknown as string,
    );
    return {
      walletAddress,
      contract,
      label: TxLabel.Withdraw,
      tag: TxTag.PoolDeposit,
      sender: walletAddress,
      sentAmount: amount,
      sentToken: token,
      friendlyDescription: txType.description,
    };
  }

  lockPositionFundsHook(): IParsedTx {
    const { txType, walletAddress, contractActions } = this.args;
    const openPositionAction = _.first(
      contractActions.lock_position_funds_hook,
    );
    const contract = openPositionAction.contract as unknown as string;
    const { token, amount }: IAmount = separateAmountFromToken(
      openPositionAction.total_locked_amount as unknown as string,
    );
    return {
      walletAddress,
      contract,
      label: TxLabel.Withdraw,
      tag: TxTag.PoolDeposit,
      sender: walletAddress,
      sentAmount: amount,
      sentToken: token,
      friendlyDescription: txType.description,
    };
  }

  process(args: ParserProcessArgs): IParsedTx[] {
    this.args = args;
    const openPositionTx = this.openPosition();
    const mintTx = MintEngine.mint(args);
    const swapTx = SwapEngine.swap(args);
    const lockPositionFundsHookTx = this.lockPositionFundsHook();

    return [openPositionTx].concat([mintTx], swapTx, [lockPositionFundsHookTx]);
  }
}

export const MirProtocol = {
  MirPoolDeposit,
  MirPoolWithdraw,
  MirBorrow,
  MirOpenShortFarm,
};
