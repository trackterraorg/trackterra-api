import { TxLabel } from '../parser.enums';
import { ParserProcessArgs } from '../args';
import { IAmount, IParsedTx, IParser } from '../parser.interfaces';
import { TxTag } from '..';
import { TransferEngine } from './transfer';


export class PoolTransferEngine {

    static process(args: ParserProcessArgs): IParsedTx[]{

        let contractActions = args.contractActions;
        const contractKeys = Object.keys(contractActions);

        let key: string;
        let tag: TxTag;

        if (contractKeys.includes("bond")) {
            key = 'from';
            tag = TxTag.PoolDeposit;
        } else if (contractKeys.includes("unbond")) {
            key = 'to';
            tag = TxTag.PoolWithdrawal;
        } else {
            return [];
        }

        const actions = contractActions['transfer' ?? 'send'].filter((tA) => {
            return tA[key] as unknown as string === args.walletAddress;
        });

        if(! actions) {
            return [];
        }

        contractActions = {
            transfer: actions
        };
        
        const txType = args.txType;
        txType.tag = tag;
    
        return (new TransferEngine()).process({
            ...args, txType, contractActions
        });
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
