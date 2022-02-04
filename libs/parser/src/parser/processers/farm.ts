import { separateAmountFromToken } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IAmount, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { IParsedTx, IParser } from '../parser.interfaces';
import { MintEngine } from './mint';
import { SwapEngine } from './swap';
import { GenericTransfer } from './transfer';

export abstract class Farm {
  protected objTransfer: GenericTransfer;

  constructor() {
    this.objTransfer = new GenericTransfer();
  }
}

export class MirOpenShortFarm extends Farm implements IParser {
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

/**
 * Extract from contract actions
 */
export const Farms = {
  MirOpenShortFarm,
};
