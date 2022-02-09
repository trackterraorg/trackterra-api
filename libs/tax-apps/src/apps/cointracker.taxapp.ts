import { TxCointracker } from "@trackterra/proto-schema/wallet";
import { ICsvHeaderCell, ITaxApp } from "../interfaces/base.taxapp";

export class CoinTracker implements ITaxApp {
    
    txObj() {
        return TxCointracker;
    };

    csvCells(): ICsvHeaderCell[] {
        return [
            { id: 'timestamp', title: 'Date' },
            { id: 'receivedAmount', title: 'Received Quantity' },
            { id: 'receivedToken', title: 'Received Currency' },
            { id: 'sentAmount', title: 'Sent Quantity' },
            { id: 'sentToken', title: 'Sent Currency' },
            { id: 'feeAmount', title: 'Fee amount' },
            { id: 'feeToken', title: 'Fee token' },
            { id: 'label', title: 'Label' },
            { id: 'tag', title: 'Tag' },
        ]
    }

}