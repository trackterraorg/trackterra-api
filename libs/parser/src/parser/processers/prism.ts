import _ = require('lodash');
import { IParsedTx, IParser, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';

export class PrismRefract implements IParser {

  process(args: ParserProcessArgs): IParsedTx[] {

    const { contractActions } = args;
    const walletAddress = args.walletAddress as unknown as string;

    const totalMinted = _.first(contractActions.bond_split).minted as unknown as number;

    const minted = _.filter(contractActions.mint, (k) => k.to as unknown as string == walletAddress);
    const sentAmount = (totalMinted / _.size(minted)) as unknown as string;

    return minted.map((mintedTx) => {
      const receivedAmount = mintedTx.amount as unknown as string;
      return {
        walletAddress: args.walletAddress,
        label: TxLabel.Swap,
        sentAmount,
        sentToken: 'uluna',
        receivedAmount,
        receivedToken: mintedTx.contract as unknown as string,
        tag: TxTag.Swap,
        friendlyDescription: args.txType.description,
      }
    });
  };
  
}

export class PrismBond implements IParser {

  process(args: ParserProcessArgs): IParsedTx[] {

    const { contractActions } = args;
    const walletAddress = args.walletAddress as unknown as string;

    const totalMinted = _.first(contractActions.bond).minted as unknown as number;

    const minted = _.filter(contractActions.mint, (k) => k.to as unknown as string == walletAddress);
    const sentAmount = (totalMinted / _.size(minted)) as unknown as string;

    return minted.map((mintedTx) => {
      const receivedAmount = mintedTx.amount as unknown as string;
      return {
        walletAddress: args.walletAddress,
        label: TxLabel.Swap,
        sentAmount,
        sentToken: 'uluna',
        receivedAmount,
        receivedToken: mintedTx.contract as unknown as string,
        tag: TxTag.Swap,
        friendlyDescription: args.txType.description,
      }
    });
  };
  
}

export class PrismMerge implements IParser {

  process(args: ParserProcessArgs): IParsedTx[] {

    const { contractActions } = args;
    const walletAddress = args.walletAddress as unknown as string;

    const transfer = _.first(contractActions.transfer);
    const total = transfer.amount as unknown as number;

    const burnt = _.filter(contractActions.burn_from, (k) => k.from as unknown as string == walletAddress);
    const receivedAmount = (total / _.size(burnt)) as unknown as string;

    return burnt.map((burnTx) => {
      const sentAmount = burnTx.amount as unknown as string;
      return {
        walletAddress: args.walletAddress,
        label: TxLabel.Swap,
        sentAmount,
        sentToken: burnTx.contract as unknown as string,
        receivedAmount,
        receivedToken: transfer.contract as unknown as string,
        tag: TxTag.Swap,
        friendlyDescription: args.txType.description,
      }
    });
  };
  
}

export const PrismProtocol = {
  PrismRefract,
  PrismBond,
  PrismMerge,
};
