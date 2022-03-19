import _ = require('lodash');
import { IAmount, IParsedTx, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';

export class MintEngine {
  static process(
    args: ParserProcessArgs,
    dir: {
      label: TxLabel;
      tag: TxTag;
    },
  ): IParsedTx {
    const { walletAddress, txType, contractActions } = args;

    const mintAction: any = _.first(contractActions.mint);

    const contract = mintAction.contract;
    const to = mintAction.to;
    const receivedAmount = mintAction.amount;
    const receivedToken = contract;
    const sender = contract;
    const recipient = to;

    return {
      walletAddress,
      contract,
      label: dir.label,
      tag: dir.tag,
      sender,
      recipient,
      receivedAmount,
      receivedToken,
      friendlyDescription: txType.description,
    };
  }
}

export const Minters = {};
