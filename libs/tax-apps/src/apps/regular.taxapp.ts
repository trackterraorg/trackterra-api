import { seperateIndexFromToken, timeToUtc } from "@trackterra/common";
import { Tx } from "@trackterra/proto-schema/wallet";
import { ITaxApp } from "../interfaces/base.taxapp.interface";
import { AppAttrType } from "./app.types";
import { BaseTaxApp } from "./base.taxapp";

export class Regular extends BaseTaxApp implements ITaxApp {

    attributes: AppAttrType[] = [
        { id: 'txhash', title: 'Tx hash'},
        { id: 'blockHeight', title: 'Block height' },
        { id: 'timestamp', title: 'Timestamp', formatter: (val) => timeToUtc(val)},
        { id: 'label', title: 'Label' },
        { id: 'tag', title: 'Tag' },
        { id: 'contract', title: 'Contract' },
        { id: 'sender', title: 'Sender' },
        { id: 'recipient', title: 'Recipient' },
        { id: 'receivedAmount', title: 'Received amount' },
        { id: 'receivedToken', title: 'Received token', formatter: (val) => seperateIndexFromToken(val)?.token },
        { id: 'sentAmount', title: 'Sent amount' },
        { id: 'sentToken', title: 'Sent token', formatter: (val) => seperateIndexFromToken(val)?.token },
        { id: 'feeAmount', title: 'Fee amount' },
        { id: 'feeToken', title: 'Fee token', formatter: (val) => seperateIndexFromToken(val)?.token },
        { id: 'taxAmount', title: 'Tax amount' },
        { id: 'taxToken', title: 'Tax token' },
        { id: 'netWorthAmount', title: 'Networth amount' },
        { id: 'netWorthToken', title: 'Networth token', formatter: (val) => seperateIndexFromToken(val)?.token },
        { id: 'memo', title: 'Memo' },
        { id: 'friendlyDescription', title: 'Friendly description' }
    ];

    specialTags = {};

    txObj() {
        return Tx;
    };
}