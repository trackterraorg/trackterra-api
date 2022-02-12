import { seperateIndexFromToken } from "@trackterra/common";
import { TxKoinly } from "@trackterra/proto-schema/wallet";
import { ITaxApp } from "../interfaces/base.taxapp.interface";
import { AppAttrType } from "./app.types";
import { BaseTaxApp } from "./base.taxapp";

export class Koinly extends BaseTaxApp implements ITaxApp {

    attributes: AppAttrType[] = [
        { id: 'timestamp', title: 'Date' },
        { id: 'sentAmount', title: 'Sent Amount', formatter: this.generateTokenName},
        { id: 'sentToken', title: 'Sent Currency' },
        { id: 'receivedAmount', title: 'Received Amount' },
        { id: 'receivedToken', title: 'Received Currency', formatter: this.generateTokenName},
        { id: 'feeAmount', title: 'Fee Amount' },
        { id: 'feeToken', title: 'Fee Currency', formatter: this.generateTokenName},
        { id: 'netWorthAmount', title: 'Networth Amount' },
        { id: 'netWorthToken', title: 'Networth Currency', formatter: this.generateTokenName },
        { id: 'tag', title: 'Label' },
        { id: 'friendlyDescription', title: 'Description' },
        { id: 'txhash', title: 'Tx hash' },
    ];

    specialTags = {
        Fee: 'cost',
        StakingRewards: 'reward',
    }

    txObj() {
        return TxKoinly;
    };


    private generateTokenName(val: string) {

        if (! val) {
            return;
        }

        const token = seperateIndexFromToken(val);
        if (! token.index) {
            return val;
        }

        return 'NULL' + token.index;
    }
}