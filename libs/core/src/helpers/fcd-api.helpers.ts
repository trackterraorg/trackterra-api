import { ContractInfo, TxInfo } from '@terra-money/terra.js';
import { ApisauceInstance, create } from 'apisauce';

export const DEFAULT_FCD_URL = 'https://fcd.terra.dev/v1';
export const DEFAULT_LIMIT = 100;
export class FCDApi {
  private readonly _api: ApisauceInstance;

  public get api() {
    return this._api;
  }

  constructor(fcdUrl = undefined) {
    this._api = create({
      baseURL: fcdUrl ?? DEFAULT_FCD_URL,
      headers: { Accept: 'application/json' },
    });
  }

  async getByTxHash(txHash: string): Promise<TxInfo> {
    const result = await this.api.get(`/tx/${txHash}`);

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

    const result: any = await this.api.get(`/txs`, args);

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
    const result = await this._api.get(`/wasm/contract/${address}`);

    if (result.ok) {
      const contractInfo: ContractInfo = result.data as unknown as ContractInfo;
      return contractInfo;
    }

    if (result.problem) {
      console.error(result.problem);
    }

    throw 'Could not fetch contract info for contract ' + address;
  }
}
