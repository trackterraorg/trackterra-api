import { EventAction } from '@trackterra/parser/transformers';
import { separateAmountFromToken } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IAmount, IParsedTx, IParser, ISwapAction, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { MintEngine } from './mint';
import { SwapEngine } from './swap';
import { TransferEngine } from './transfer';

export class NexusStakingRewards implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    return new TransferEngine().process(args);
  }
}

export class NexusClaimRewards implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    let contractActions = args.contractActions;

    const transfer = contractActions.transfer.map((cA) => {
      cA.sender = cA.from;
      cA.recipient = cA.to;

      return cA;
    });

    args.contractActions = { transfer };

    return new TransferEngine().process(args);
  }
}

export class NexusVaultDeposit implements IParser {
  swapBassetNasset({ walletAddress, contractActions }: ParserProcessArgs): {
    sent: any;
    received: any;
  } {
    const sent: any | undefined = _.first(contractActions?.send);
    const received: any | undefined = _.first(contractActions?.mint);

    return {
      sent,
      received,
    };
  }

  swapNassetBasset({ walletAddress, contractActions }: ParserProcessArgs): {
    sent: any;
    received: any;
  } {
    const sent: any | undefined = _.first(contractActions?.send);
    const received: any | undefined = _.first(contractActions?.transfer);

    return {
      sent,
      received,
    };
  }

  process(args: ParserProcessArgs): IParsedTx[] {
    const contract = args.contractActions.send[0].contract as unknown as string;
    const key = _(['mint', 'burn'])
      .intersection(Object.keys(args.contractActions))
      .first();

    const keys = Object.keys(args.contractActions);

    let sentRecieve: {
      sent: any;
      received: any;
    };

    if (keys.includes('mint')) {
      sentRecieve = this.swapBassetNasset(args);
    }

    if (keys.includes('burn')) {
      sentRecieve = this.swapNassetBasset(args);
    }

    const { sent, received } = sentRecieve;

    const swapAction = {
      contract: sent.to,
      sender: args.walletAddress,
      receiver: args.walletAddress,
      offer_asset: sent.contract,
      ask_asset: received.contract,
      offer_amount: sent.amount,
      return_amount: received.amount,
    };

    return SwapEngine.swap({
      ...args,
      contractActions: {
        swap: [swapAction as unknown as EventAction],
      },
    });
  }
}

export const NexusProtocol = {
  NexusStakingRewards,
  NexusClaimRewards,
  NexusVaultDeposit,
};
