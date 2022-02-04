import { IParsedTx, IParser, TxLabel } from '..';
import { ParserProcessArgs } from '../args';

export class AnchorAustRedeem implements IParser {
  process({
    walletAddress,
    txType,
    contractActions,
  }: ParserProcessArgs): IParsedTx[] {
    const contract = contractActions.send[0].contract as unknown as string;
    const swapAction: any | undefined = contractActions?.redeem_stable[0];
    return [
      {
        walletAddress,
        contract: contract,
        label: TxLabel.Swap,
        tag: txType.tag,
        sender: walletAddress,
        sentAmount: swapAction.burn_amount,
        sentToken: contract,
        recipient: walletAddress,
        receivedAmount: swapAction.redeem_amount,
        receivedToken: 'uusd',
        friendlyDescription: txType.description,
      },
    ];
  }
}

export class AnchorAustMint implements IParser {
  process({
    walletAddress,
    txType,
    contractActions,
  }: ParserProcessArgs): IParsedTx[] {
    const contract = contractActions.mint[0].contract as unknown as string;
    const swapAction: any | undefined = contractActions?.deposit_stable[0];
    return [
      {
        walletAddress,
        contract: contract,
        label: TxLabel.Swap,
        tag: txType.tag,
        sender: walletAddress,
        sentAmount: swapAction.deposit_amount,
        sentToken: 'uusd',
        recipient: walletAddress,
        receivedAmount: swapAction.mint_amount,
        receivedToken: contract,
        friendlyDescription: txType.description,
      },
    ];
  }
}

export const Earners = {
  AnchorAustRedeem,
  AnchorAustMint,
};
