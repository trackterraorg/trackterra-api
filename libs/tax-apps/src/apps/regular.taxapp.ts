import { Tx } from "@trackterra/proto-schema/wallet";
import { ICsvHeaderCell, ITaxApp } from "../interfaces/base.taxapp";

export class Regular implements ITaxApp {
    txObj() {
        return Tx;
    };

    csvCells(): ICsvHeaderCell[] {
        return [
            { id: 'txhash', title: 'Tx hash' },
            { id: 'blockHeight', title: 'Block height' },
            { id: 'timestamp', title: 'Timestamp' },
            { id: 'label', title: 'Label' },
            { id: 'tag', title: 'Tag' },
            { id: 'contract', title: 'Contract' },
            { id: 'sender', title: 'Sender' },
            { id: 'recipient', title: 'Recipient' },
            { id: 'receivedAmount', title: 'Received amount' },
            { id: 'receivedToken', title: 'Received token' },
            { id: 'sentAmount', title: 'Sent amount' },
            { id: 'sentToken', title: 'Sent token' },
            { id: 'feeAmount', title: 'Fee amount' },
            { id: 'feeToken', title: 'Fee token' },
            { id: 'taxAmount', title: 'Tax amount' },
            { id: 'taxToken', title: 'Tax token' },
            { id: 'netWorthAmount', title: 'Networth amount' },
            { id: 'netWorthToken', title: 'Networth token' },
            { id: 'memo', title: 'Memo' },
            { id: 'friendlyDescription', title: 'Friendly description' },
        ]
    }

}