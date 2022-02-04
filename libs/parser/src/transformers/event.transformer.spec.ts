import { TxInfo, TxLog } from '@terra-money/terra.js';
import { FCDApi } from '@trackterra/core';
import { UnableToFetchTxInfoException } from '../exceptions';
import { EventTransformer } from './event.transformer';

describe('The event transformer ', () => {
  const api = new FCDApi();

  it('should transform contract actions', async () => {
    const eventTransformer = new EventTransformer();

    const txInfo: TxInfo | undefined = await api.getByTxHash(
      '50E8D655E0EEB1F5DEB1BA1B3C884ECE121B69CB7007E89951599F62A57E7C29',
    );

    if (txInfo.logs === undefined) {
      throw new UnableToFetchTxInfoException();
    }

    const logs: TxLog[] = txInfo.logs;

    const c: any = eventTransformer.transform(logs[0]).getActions();
    expect(Object.keys(c.contractActions)).toEqual([
      'swap',
      'transfer',
      'decrease_balance',
      'increase_balance',
    ]);
  });

  it('should transform transfer actions', async () => {
    const eventTransformer = new EventTransformer();

    const txInfo: TxInfo | undefined = await api.getByTxHash(
      '47AF52C4EF5229796F4BCD315EAF6A36C9E4830C1339C63B68C076BC87634D00',
    );

    if (txInfo.logs === undefined) {
      throw new UnableToFetchTxInfoException();
    }

    const logs: TxLog[] = txInfo.logs;

    const c: any = eventTransformer.transform(logs[0]).getActions();

    expect(Object.keys(c.transferActions[0])).toEqual([
      'recipient',
      'sender',
      'amount',
    ]);
  });
});
