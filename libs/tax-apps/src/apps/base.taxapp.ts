import { TxTag } from "@trackterra/parser/parser";
import _ = require("lodash");
import { ICsvHeaderCell } from "../interfaces/csv-header-cell.interface";
import { AppAttrType } from "./app.types";

export abstract class BaseTaxApp {

    abstract specialTags: any;
    abstract attributes: AppAttrType[]

    csvCells(): ICsvHeaderCell[] {
        return this.attributes.map((attr) => {
            return {
                id: attr.id,
                title: attr.title,
            }
        })
    }

    transformTag(tag: string): string {
        if(_.isEmpty(tag)) {
            return ;
        }

        let transform = '';
        _.forIn(TxTag, (value, key) => {
            if (value == tag) {
                transform = this.specialTags[key];
                return false;
            }
        });

        return transform;
    }

    hasSpecialTags() {
        return _.size(this.specialTags) > 0;
    }
}