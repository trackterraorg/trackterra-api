import { ContractInfo, TxInfo } from '@terra-money/terra.js';
import { ApisauceInstance, create } from 'apisauce';

export const DEFAULT_FCD_URL = 'https://columbus-fcd.terra.dev';
export const DEFAULT_LIMIT = 100;
export class FCDApi {
  private readonly _api: ApisauceInstance;

  public get api() {
    return this._api;
  }

  constructor(fcdUrl = undefined) {
    this._api = create({
      baseURL: fcdUrl ?? DEFAULT_FCD_URL,
      headers: {
        Accept: 'application/json',
        'User-Agent': 'TT/1.0',
      },
    });
  }

  async getByTxHash(txHash: string): Promise<TxInfo> {
    console.log(this.api.getBaseURL());

    const result = await this.api.get(`/v1/tx/${txHash}`);

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

    const result: any = await this.api.get(`/v1/txs`, args);

    if (result.ok) {
      const { next, block } = result.data;

      const txs: TxInfo[] = result.data.txs.map((tx: any): TxInfo => tx);

      return { txs, next };
    }

    if (result.problem) {
      console.error(result.problem);
    }

    throw 'Could not fetch transactions';
  }

  private mapTx(result: any) {
    return JSON.parse(JSON.stringify(result.data));
  }

  async getContractInfo(address: string): Promise<ContractInfo> {
    const result: any = await this._api.get(
      `/terra/wasm/v1beta1/contracts/${address}`,
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
