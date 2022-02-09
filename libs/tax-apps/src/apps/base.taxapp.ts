import { TxTag } from "@trackterra/parser/parser";
import _ = require("lodash");

export abstract class BaseTaxApp {

    abstract specialTags: any;

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