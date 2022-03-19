import { separateAmountFromToken, splitTokens } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IAmount, IParsedTx, IParser, ISwapAction, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { MintEngine } from './mint';
import { SwapEngine } from './swap';
import { ITransferRecord, TransferEngine } from './transfer';

export class MirPoolDeposit implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const keys = Object.keys(args.contractActions);

    if (keys.includes('send')) {
      return new MirPoolDeposit1().process(args);
    }

    if (keys.includes('deposit')) {
      return new MirPoolDeposit2().process(args);
    }
  }
}

export class MirPoolDeposit1 implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const contractActions = _.pick(args.contractActions, 'send');

    const poolDeposit = new TransferEngine().process({
      ...args,
      contractActions,
      transferActions: undefined,
    });

    const protocolFeeAction = args.contractActions.burn.find((cA) => {
      return Object.keys(cA).includes('protocol_fee');
    });

    let protocolFee: IParsedTx[] = [];
    if (protocolFeeAction) {
      const amt: IAmount = separateAmountFromToken(
        protocolFeeAction.protocol_fee as unknown as string,
      );
      protocolFee = [
        {
          walletAddress: args.walletAddress,
          label: TxLabel.Fee,
          sentAmount: amt.amount,
          sentToken: amt.token,
          tag: TxTag.Fee,
          friendlyDescription: args.txType.description,
        },
      ];
    }
    return poolDeposit.concat(protocolFee);
  }
}

export class MirPoolDeposit2 implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const { transferActions } = args;

    return new TransferEngine().process({
      ...args,
      contractActions: undefined,
      transferActions,
    });
  }
}

export class MirBorrow implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const openPosition = _.first(args.contractActions.open_position);

    const poolDepositActions = [
      {
        sender: args.walletAddress,
        recipient: undefined,
        amount: separateAmountFromToken(
          openPosition.collateral_amount as unknown as string,
        ),
      },
    ];

    const poolDepositTx = new TransferEngine().process({
      ...args,
      txType: { ...args.txType, tag: TxTag.PoolDeposit },
      contractActions: undefined,
      transferActions: poolDepositActions,
    });

    const poolWithdrawActions = [
      {
        sender: undefined,
        recipient: args.walletAddress,
        amount: separateAmountFromToken(
          openPosition.mint_amount as unknown as string,
        ),
      },
    ];

    const poolWithdrawTx = new TransferEngine().process({
      ...args,
      txType: { ...args.txType, tag: TxTag.PoolWithdrawal },
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

    const mintAction: any = _.first(args.contractActions.mint);
    const mintTx = new TransferEngine().process({
      ...args,
      contractActions: undefined,
      transferActions: [
        {
          sender: mintAction.contract,
          recipient: args.walletAddress,
          amount: {
            amount: mintAction.amount,
            token: mintAction.contract,
          },
        },
      ],
      txType: {
        ...args.txType,
        tag: TxTag.PoolWithdrawal,
      },
    });
    const swapTx = SwapEngine.swap(args);
    const lockPositionFundsHookTx = this.lockPositionFundsHook();

    return [openPositionTx].concat(mintTx, swapTx, [lockPositionFundsHookTx]);
  }
}
export class MirCloseShortFarm implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const poolDepositActions = args.allEvents.find((aE) => {
      return Object.keys(aE.contractActions).includes('send');
    });

    const poolDepositTx = new MirPoolDeposit().process({
      ...args,
      contractActions: poolDepositActions.contractActions,
      transferActions: undefined,
      allEvents: undefined,
    });

    const poolWithdrawalActions = args.allEvents.find((aE) => {
      return Object.keys(aE.contractActions).includes('withdraw');
    });

    let poolWithdrawalTx = new MirPoolWithdraw().process({
      ...args,
      contractActions: poolWithdrawalActions.contractActions,
    });

    const feeTx = poolDepositTx.find((tx) => {
      return tx.label === TxLabel.Fee;
    });

    poolWithdrawalTx = poolWithdrawalTx.map((tx) => {
      if (tx.tag === TxTag.PoolWithdrawal) {
        const receivedAmount: number = +tx.receivedAmount;
        const fee: number = +feeTx.sentAmount;
        const amt = receivedAmount + fee;
        tx.receivedAmount = `${amt}`;
      }

      return tx;
    });

    let releaseShortingFundsAction: any = args.allEvents.find((aE) => {
      return Object.keys(aE.contractActions).includes('release_shorting_funds');
    })?.contractActions.release_shorting_funds;

    let taxTx = [];
    let taxAmount: any = {};
    let unlockTx = [];
    if (releaseShortingFundsAction) {
      releaseShortingFundsAction = _.first(releaseShortingFundsAction);
      if (!_.isEmpty(releaseShortingFundsAction.tax_amount)) {
        const taxAmount: IAmount = separateAmountFromToken(
          releaseShortingFundsAction.tax_amount,
        );
        const taxAction = {
          sender: args.walletAddress,
          recipient: releaseShortingFundsAction.contract,
          amount: taxAmount,
        };

        taxTx = new TransferEngine().process({
          ...args,
          contractActions: undefined,
          transferActions: [taxAction],
          txType: {
            ...args.txType,
            tag: TxTag.Cost,
          },
        });
      }

      if (!_.isEmpty(releaseShortingFundsAction.unlocked_amount)) {
        const unlockAmount: IAmount = separateAmountFromToken(
          releaseShortingFundsAction.unlocked_amount,
        );

        if (!_.isEmpty(taxAmount)) {
          unlockAmount.amount += taxAmount.amount;
        }

        const unlockAction = {
          sender: releaseShortingFundsAction.contract,
          recipient: args.walletAddress,
          amount: unlockAmount,
        };

        unlockTx = new TransferEngine().process({
          ...args,
          contractActions: undefined,
          transferActions: [unlockAction],
          txType: {
            ...args.txType,
            tag: TxTag.PoolWithdrawal,
          },
        });
      }
    }

    return poolDepositTx
      .concat(poolWithdrawalTx)
      .concat(unlockTx)
      .concat(taxTx);
  }
}

export class MirAdjustBorrow implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const poolDepositTx = new MirPoolDeposit().process({
      ...args,
      contractActions: _.first(args.allEvents).contractActions,
      transferActions: undefined,
      allEvents: undefined,
    });

    let poolWithdrawalTx = new MirPoolWithdraw().process(args);

    const feeTx = poolDepositTx.find((tx) => {
      return tx.label === TxLabel.Fee;
    });

    poolWithdrawalTx = poolWithdrawalTx.map((tx) => {
      if (tx.tag === TxTag.PoolWithdrawal) {
        const receivedAmount: number = +tx.receivedAmount;
        const fee: number = +feeTx.sentAmount;
        const amt = receivedAmount + fee;
        tx.receivedAmount = `${amt}`;
      }

      return tx;
    });

    return poolDepositTx.concat(poolWithdrawalTx);
  }
}

export class MirLiquidation implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const { walletAddress, contractActions } = args;

    let txs: IParsedTx[] = [];

    contractActions.auction.forEach((auction: any) => {
      const offerAsset = separateAmountFromToken(
        auction.return_collateral_amount,
      );
      const askAsset = separateAmountFromToken(auction.liquidated_amount);

      const swapAction: any = {
        contract: auction.contract,
        sender: walletAddress,
        receiver: auction.contract,
        offer_asset: offerAsset.token,
        ask_asset: askAsset.token,
        offer_amount: offerAsset.amount,
        return_amount: askAsset.amount,
      };

      const swapTx = SwapEngine.swap({
        ...args,
        contractActions: {
          swap: [swapAction],
        },
        transferActions: undefined,
      });

      txs = txs.concat(swapTx);
    });

    const burnActions = contractActions.burn.map((cA: any) => {
      cA.to = cA.from;
      cA.from = walletAddress;
      return cA;
    });

    const withdrawTxs = new TransferEngine().process({
      ...args,
      contractActions: {
        send: burnActions,
      },
      txType: { ...args.txType, tag: TxTag.Withdraw },
      transferActions: undefined,
    });

    return txs.concat(withdrawTxs);
  }
}

export class MirPoolWithdraw implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const keys = Object.keys(args.contractActions);

    if (keys.includes('withdraw')) {
      return new MirPoolWithdraw1().process(args);
    }

    if (keys.includes('mint')) {
      return new MirPoolWithdraw2().process(args);
    }
  }
}

export class MirPoolWithdraw1 implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const withdrawAction = _.first(args.contractActions.withdraw);
    const amt = separateAmountFromToken(
      withdrawAction.withdraw_amount as unknown as string,
    );

    const poolWithdrawal: IParsedTx[] = [
      {
        walletAddress: args.walletAddress,
        label: TxLabel.Deposit,
        receivedAmount: amt.amount,
        receivedToken: amt.token,
        tag: TxTag.PoolWithdrawal,
        friendlyDescription: args.txType.description,
      },
    ];

    return poolWithdrawal;
  }
}
export class MirPoolWithdraw2 implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    const { walletAddress, contractActions } = args;

    const mintActions = contractActions.mint
      .filter((cA: any) => {
        return cA.to === walletAddress;
      })
      .map((cA: any) => {
        cA.sender = cA.contract;
        cA.recipient = walletAddress;
        cA.amount = {
          amount: cA.amount,
          token: cA.contract,
        };
        return cA;
      });

    return new TransferEngine().process({
      ...args,
      contractActions: undefined,
      transferActions: mintActions,
    });
  }
}

export const MirProtocol = {
  MirPoolDeposit,
  MirPoolWithdraw,
  MirBorrow,
  MirOpenShortFarm,
  MirCloseShortFarm,
  MirLiquidation,
  MirAdjustBorrow,
};
