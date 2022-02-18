import { TxLabel } from '../parser.enums';
import { ParserProcessArgs } from '../args';
import { IAmount, IParsedTx, IParser } from '../parser.interfaces';
import { TxTag } from '..';
import { TransferEngine } from './transfer';


export class PoolTransferEngine {

    static process(args: ParserProcessArgs): IParsedTx[]{
        const { contractActions } = args;
        const contractKeys = Object.keys(contractActions);

        if (contractKeys.includes("bond")) {
            return this.deposit(args);
        }

        if (contractKeys.includes("bond")) {
            return this.deposit(args);
        }

        return [];
        
    }

    static deposit(args: ParserProcessArgs): IParsedTx[] {

        const { contractActions } = args;

        const depositActions = contractActions?.send.filter((tA) => {
            return tA.from as unknown as string === args.walletAddress;
        });

        if(! depositActions) {
            return [];
        }

        args.contractActions = {
            transfer: depositActions
        };
        
        args.txType.tag = TxTag.PoolDeposit;
    
        return (new TransferEngine()).process(args);
    }

    static withdraw(args: ParserProcessArgs): IParsedTx[] {
        return;
    }
}

export class GenericPoolTransfer implements IParser {
  process(args: ParserProcessArgs): IParsedTx[] {
    return PoolTransferEngine.process(args);
  }
}

export const PoolTransfers = {
  GenericPoolTransfer,
};
