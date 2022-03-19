import { ValidationError } from 'joi';
import * as _ from 'lodash';
export class BlacklistLoader {
  private static instance: BlacklistLoader;
  private _blackList = [];
  private _errors: any = [];
  'Can not parse this address. Please try a different address';
  public static async getInstance(): Promise<BlacklistLoader> {
    if (!BlacklistLoader.instance) {
      const instance = new BlacklistLoader();
      await instance.loadBlacklist();
      return instance;
    }

    return BlacklistLoader.instance;
  }

  private async loadBlacklist() {
    const yaml = await import('js-yaml');
    const fs = await import('fs');
    const path = await import('path');

    const blacklistYamlFile = path.resolve('./blacklist/blacklist.yaml');

    try {
      const blacklist: any = yaml.load(
        fs.readFileSync(blacklistYamlFile, 'utf8'),
      );
      this._blackList = blacklist.blacklist;
    } catch (e) {
      console.log(e);
    }
  }

  get blackList() {
    return this._blackList;
  }

  isInBlackList(address: string) {
    const exist = this.blackList.find((a: string) => {
      return a === address;
    });

    return exist !== undefined;
  }

  addressBlockMessage(address: string) {
    return `Can not parse this address (${address}). Please try a different address`;
  }
}
