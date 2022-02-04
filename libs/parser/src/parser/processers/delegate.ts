import _ = require('lodash');
import { IParsedTx, IParser, TxLabel } from '..';
import { ParserProcessArgs } from '../args';

export class NativeDelegate implements IParser {
  process({
    walletAddress,
    txType,
    transferActions,
  }: ParserProcessArgs): IParsedTx[] {
    const transferAction = _.first(transferActions);
    const { sender, recipient, amount } = transferAction;

    return [
      {
        walletAddress,
        label: TxLabel.Withdraw,
        tag: txType.tag,
        sender: walletAddress,
        recipient,
        sentAmount: amount.amount,
        sentToken: amount.token,
        friendlyDescription: txType.description,
      },
    ];
  }
}

export class NativeReward implements IParser {
  process({
    walletAddress,
    txType,
    transferActions,
  }: ParserProcessArgs): IParsedTx[] {
    return transferActions.map((transferAction) => {
      const { sender, amount } = transferAction;
      return {
        walletAddress,
        label: TxLabel.Deposit,
        tag: txType.tag,
        sender,
        recipient: walletAddress,
        receivedAmount: amount.amount,
        receivedToken: amount.token,
        friendlyDescription: txType.description,
      };
    });
  }
}

export const Delegate = {
  NativeDelegate,
  NativeReward,
};
