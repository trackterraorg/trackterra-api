import { seperateIndexFromToken } from "@trackterra/common";
import { TxCointracker } from "@trackterra/proto-schema/wallet";
import { ITaxApp } from "../interfaces/base.taxapp.interface";
import { AppAttrType } from "./app.types";
import { BaseTaxApp } from "./base.taxapp";

export class CoinTracker extends BaseTaxApp implements ITaxApp {

    attributes: AppAttrType[] = [
        { id: 'timestamp', title: 'Date' },
        { id: 'receivedAmount', title: 'Received Quantity' },
        { id: 'receivedToken', title: 'Received Currency', formatter: (val) => seperateIndexFromToken(val)?.token },
        { id: 'sentAmount', title: 'Sent Quantity' },
        { id: 'sentToken', title: 'Sent Currency', formatter: (val) => seperateIndexFromToken(val)?.token },
        { id: 'feeAmount', title: 'Fee amount' },
        { id: 'feeToken', title: 'Fee token', formatter: (val) => seperateIndexFromToken(val)?.token },
        { id: 'label', title: 'Label' },
        { id: 'tag', title: 'Tag' },
    ];
    
    specialTags = {};
    
    txObj() {
        return TxCointracker;
    };
}