import { TxCointracker } from "@trackterra/proto-schema/wallet";
import { ITaxApp } from "../interfaces/base.taxapp.interface";
import { ICsvHeaderCell } from "../interfaces/csv-header-cell.interface";
import { ITagTransform } from "../interfaces/tag-transform.interface";
import { BaseTaxApp } from "./base.taxapp";

export class CoinTracker extends BaseTaxApp implements ITaxApp {

    specialTags = {};
    
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