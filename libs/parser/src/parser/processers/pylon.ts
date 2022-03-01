import { separateAmountFromToken } from '@trackterra/parser/utils';
import _ = require('lodash');
import { IAmount, IParsedTx, IParser, ISwapAction, TxLabel, TxTag } from '..';
import { ParserProcessArgs } from '../args';
import { MintEngine } from './mint';
import { SwapEngine } from './swap';
import { ITransferRecord, TransferEngine } from './transfer';

export class PylonPoolDeposit implements IParser {

  process(args: ParserProcessArgs): IParsedTx[] {
    const { walletAddress, contractActions } = args;

    const depositActions: ITransferRecord[] = contractActions.deposit.map((action: any) => {
      return {
        contract: action.contract,
        sender: walletAddress,
        recipient: action.sender,
        amount: {
          amount: action.deposit_amount,
          token: 'uusd',
        }
      }
    });

    return (new TransferEngine()).process({
      ...args,
      contractActions: undefined,
      transferActions: depositActions
    });
  };
  
}

export const PylonProtocol = {
  PylonPoolDeposit,
};
