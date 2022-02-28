import _ = require('lodash');
import { IAmount, IParsedTx, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';

export class MintEngine {
  static mint(args: ParserProcessArgs): IParsedTx {
    const { walletAddress, txType, contractActions } = args;

    const mintAction = _.first(contractActions.mint);

    const contract = mintAction.contract as unknown as string;
    const to = mintAction.to as unknown as string;
    const receivedAmount = mintAction.amount as unknown as string;
    const receivedToken = contract;
    const sender = contract;
    const recipient = to;

    return {
      walletAddress,
      contract,
      label: TxLabel.Withdraw,
      tag: txType.tag ?? TxTag.PoolDeposit,
      sender,
      recipient,
      receivedAmount,
      receivedToken,
      friendlyDescription: txType.description,
    };
  }
}

export const Minters = {};
