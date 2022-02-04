import { TxLabel } from '../parser.enums';
import { InvalidDataException } from '../../exceptions';
import { ParserProcessArgs } from '../args';
import { IParsedTx, IParser } from '../parser.interfaces';
import { ISwapAction } from '..';
import _ = require('lodash');

export class SwapEngine {
  static swap(args: ParserProcessArgs): IParsedTx[] {
    const { walletAddress, txType, contractActions } = args;

    const swapActions: any[] | undefined = contractActions?.swap;

    if (swapActions === undefined) {
      throw new InvalidDataException('swap action');
    }

    const firstSwapAction = _.first(swapActions);
    const lastSwapAction = _.last(swapActions);

    return [
      {
        walletAddress,
        contract: firstSwapAction.contract,
        label: TxLabel.Swap,
        tag: txType.tag,
        sender: firstSwapAction.sender,
        sentAmount: firstSwapAction.offer_amount,
        sentToken: firstSwapAction.offer_asset,
        recipient: lastSwapAction.receiver,
        receivedAmount: lastSwapAction.return_amount,
        receivedToken: lastSwapAction.ask_asset,
        friendlyDescription: txType.description,
      },
    ];
  }
}
export class Swap implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    return SwapEngine.swap(args);
  }
}

export class AnchorBlunaMint implements IParser {
  process({
    walletAddress,
    txType,
    contractActions,
  }: ParserProcessArgs): IParsedTx[] {
    const contract = contractActions.mint[1].contract as unknown as string;
    const swapAction: any | undefined = contractActions?.mint[0];
    return [
      {
        walletAddress,
        contract: contract,
        label: TxLabel.Swap,
        tag: txType.tag,
        sender: walletAddress,
        sentAmount: swapAction.bonded,
        sentToken: 'uluna',
        recipient: walletAddress,
        receivedAmount: swapAction.minted,
        receivedToken: contract,
        friendlyDescription: txType.description,
      },
    ];
  }
}

export class AnchorBlunaUnbond implements IParser {
  process({
    walletAddress,
    txType,
    contractActions,
  }: ParserProcessArgs): IParsedTx[] {
    const contract = contractActions.mint[1].contract as unknown as string;
    const swapAction: any | undefined = contractActions?.mint[0];
    return [
      {
        walletAddress,
        contract: contract,
        label: TxLabel.Swap,
        tag: txType.tag,
        sender: walletAddress,
        sentAmount: swapAction.bonded,
        sentToken: 'uluna',
        recipient: walletAddress,
        receivedAmount: swapAction.minted,
        receivedToken: contract,
        friendlyDescription: txType.description,
      },
    ];
  }
}

export class AnchorLiquidateCollateral implements IParser {
  process({
    walletAddress,
    txType,
    contractActions,
  }: ParserProcessArgs): IParsedTx[] {
    const contract = contractActions.liquidate_collateral[0]
      .contract as unknown as string;

    const borrowerIndex = contractActions.liquidate_collateral.findIndex(
      (rec) => {
        return (rec.borrower as unknown as string) == walletAddress;
      },
    );

    const sent: any | undefined = contractActions?.send[borrowerIndex];
    const recieved: any | undefined =
      contractActions?.repay_stable[borrowerIndex];

    return [
      {
        walletAddress,
        contract: contract,
        label: TxLabel.Swap,
        tag: txType.tag,
        sender: sent ? walletAddress : undefined,
        sentAmount: sent?.amount,
        sentToken: sent?.contract,
        recipient: sent ? walletAddress : undefined,
        receivedAmount: recieved?.repay_amount,
        receivedToken: recieved ? 'uusd' : undefined,
        friendlyDescription: txType.description,
      },
    ];
  }
}

export class NexusVaultDeposit implements IParser {
  process({
    walletAddress,
    txType,
    contractActions,
  }: ParserProcessArgs): IParsedTx[] {
    const contract = contractActions.send[0].contract as unknown as string;

    const sent: any | undefined = contractActions?.send[0];
    const recieved: any | undefined = contractActions?.mint[0];

    return [
      {
        walletAddress,
        contract: contract,
        label: TxLabel.Swap,
        tag: txType.tag,
        sender: walletAddress,
        sentAmount: sent?.amount,
        sentToken: sent?.contract,
        recipient: sent ? walletAddress : undefined,
        receivedAmount: recieved?.amount,
        receivedToken: recieved?.contract,
        friendlyDescription: txType.description,
      },
    ];
  }
}

export const Swaps = {
  Swap,
  AnchorBlunaMint,
  AnchorBlunaUnbond,
  NexusVaultDeposit,
  AnchorLiquidateCollateral,
};
