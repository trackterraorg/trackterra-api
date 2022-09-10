import { ContractInfo, TxInfo } from '@terra-money/terra.js';
import { ChainConfig } from '@trackterra/common/interfaces/config.interface';
import { ApisauceInstance, create } from 'apisauce';

export const DEFAULT_LIMIT = 100;
export class FCDApi {
  private readonly _api: ApisauceInstance;

  public get api() {
    return this._api;
  }

  constructor(private options: ChainConfig) {
    this._api = create({
      baseURL: options.fcd,
      headers: {
        Accept: 'application/json',
        'User-Agent': 'TT/1.0',
      },
    });
  }

  async getByTxHash(txHash: string): Promise<TxInfo> {
    const result = await this.api.get(
      `${this.options.endpoints.fcd.txInfo + txHash}`,
      {},
      {
        baseURL: this.options.fcd,
      },
    );

    if (result.ok) {
      const txInfo: TxInfo = this.mapTx(result);
      return txInfo;
    }

    if (result.problem) {
      console.error(result.problem);
    }

    throw 'Could not fetch transaction';
  }

  async getByAccount(args: {
    account: string;
    block?: number;
    offset?: number;
    limit?: number;
  }): Promise<{
    txs?: TxInfo[];
    next?: number;
  }> {
    args.limit = args.limit ?? DEFAULT_LIMIT;

    try {
      const result: any = await this.api.get(
        this.options.endpoints.fcd.txs,
        args,
        {
          baseURL: this.options.fcd,
        },
      );

      if (result.ok) {
        const { next, block } = result.data;

        const txs: TxInfo[] = result.data.txs.map((tx: any): TxInfo => tx);

        return { txs, next };
      }

      if (result.problem) {
        console.error(result.problem);
      }
    } catch (error) {
      console.log(error);
    }

    throw 'Could not fetch transactions';
  }

  private mapTx(result: any) {
    return JSON.parse(JSON.stringify(result.data));
  }

  async getContractInfo(address: string): Promise<ContractInfo> {
    const result: any = await this.api.get(
      `${this.options.endpoints.lcd.contractInfo + address}`,
      {},
      {
        baseURL: this.options.lcd,
      },
    );

    if (result.ok) {
      const { contract_info: contractInfo } = result.data;
      return contractInfo as unknown as ContractInfo;
    }

    if (result.problem) {
      console.error(result.problem);
    }

    throw 'Could not fetch contract info for contract ' + address;
  }
}
