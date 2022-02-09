import { TxKoinly } from "@trackterra/proto-schema/wallet";
import { ITaxApp } from "../interfaces/base.taxapp.interface";
import { ICsvHeaderCell } from "../interfaces/csv-header-cell.interface";
import { ITagTransform } from "../interfaces/tag-transform.interface";
import { BaseTaxApp } from "./base.taxapp";

export class Koinly extends BaseTaxApp implements ITaxApp {

    specialTags = {
        Fee: 'cost',
        StakingRewards: 'reward',
    }

    txObj() {
        return TxKoinly;
    };

    csvCells(): ICsvHeaderCell[] {
        return [
            { id: 'timestamp', title: 'Date' },
            { id: 'sentAmount', title: 'Sent Amount' },
            { id: 'sentToken', title: 'Sent Currency' },
            { id: 'receivedAmount', title: 'Received Amount' },
            { id: 'receivedToken', title: 'Received Currency' },
            { id: 'feeAmount', title: 'Fee Amount' },
            { id: 'feeToken', title: 'Fee Currency' },
            { id: 'netWorthAmount', title: 'Networth Amount' },
            { id: 'netWorthToken', title: 'Networth Currency' },
            { id: 'tag', title: 'Label' },
            { id: 'friendlyDescription', title: 'Description' },
            { id: 'txhash', title: 'Tx hash' },
        ];
    }
}