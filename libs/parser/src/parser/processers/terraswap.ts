import { separateAmountFromToken } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IAmount, IParsedTx, IParser, ISwapAction, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { MintEngine } from './mint';
import { SwapEngine } from './swap';
import { ITransferRecord, TransferEngine } from './transfer';

export class TerraswapSwap implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const { walletAddress, contractActions, transferActions } = args;

    let sendAction: any = contractActions.send.find((cA: any) => {
      return cA.from === walletAddress;
    });

    if (!sendAction) {
      const firstSwap = _.first(contractActions.swap);
      sendAction = {
        contract: firstSwap.offer_asset,
        amount: firstSwap.offer_amount,
      };
    }

    let recieveAction: any = transferActions.find((tA: any) => {
      return tA.recipient === walletAddress;
    });

    // get last swap if transfer action not found
    if (!recieveAction) {
      const lastSwap = _.last(contractActions.swap);
      recieveAction = {
        amount: {
          amount: lastSwap.return_amount,
          token: lastSwap.ask_asset,
        },
      };
    }

    const swapAction: any = {
      sender: walletAddress,
      receiver: walletAddress,
      offer_asset: sendAction.contract,
      ask_asset: recieveAction.amount.token,
      offer_amount: sendAction.amount,
      return_amount: recieveAction.amount.amount,
    };

    return SwapEngine.swap({
      ...args,
      contractActions: {
        swap: [swapAction],
      },
      transferActions: undefined,
    });
  }
}

export class TerraswapSwap2 implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    if (args.contractActions?.swap) {
      if (args.contractActions.swap.length > 1) {
        return SwapEngine.swap(args);
      }
    }

    // get first tx that belongs to wallet address
    const sendAction = args.transferActions.find((tA: any) => {
      return tA.sender === args.walletAddress;
    });

    // get last deposit action
    const depositAction = args.transferActions.find((tA: any) => {
      return tA.recipient === args.walletAddress;
    });

    const swapAction: any = {
      contract: '',
      sender: args.walletAddress,
      receiver: args.walletAddress,
      offer_asset: sendAction.amount.token,
      ask_asset: depositAction.amount.token,
      offer_amount: sendAction.amount.amount,
      return_amount: depositAction.amount.amount,
    };

    return SwapEngine.swap({
      ...args,
      contractActions: {
        swap: [swapAction],
      },
      transferActions: undefined,
    });
  }
}

export class TerraswapSwap3 implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    // native swap takes place before contract action
    const nativeSwap: any = _.first(args.contractActions.native_swap);
    const contractSwap: any = _.first(args.contractActions.swap);

    const offerAsset = separateAmountFromToken(nativeSwap.offer);
    const askAsset: IAmount = {
      token: contractSwap.ask_asset,
      amount: contractSwap.return_amount,
    };

    const swapAction: any = {
      contract: '',
      sender: args.walletAddress,
      receiver: args.walletAddress,
      offer_asset: offerAsset.token,
      ask_asset: askAsset.token,
      offer_amount: offerAsset.amount,
      return_amount: askAsset.amount,
    };

    return SwapEngine.swap({
      ...args,
      contractActions: {
        swap: [swapAction],
      },
      transferActions: undefined,
    });
  }
}

export class TerraswapMultiSwap implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const swaps: any = args.contractActions.swap;

    let swapTxs = [];

    _.forEach(swaps, (swap) => {
      const swapTx = SwapEngine.swap({
        ...args,
        contractActions: {
          swap: [swap],
        },
        transferActions: undefined,
      });
      swapTxs = swapTxs.concat(swapTx);
    });

    return swapTxs;
  }
}

export const TerraswapProtocol = {
  TerraswapSwap,
  TerraswapSwap2,
  TerraswapSwap3,
  TerraswapMultiSwap,
};
