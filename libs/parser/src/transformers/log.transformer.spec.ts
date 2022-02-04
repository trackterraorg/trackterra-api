import { FCDApi } from '@trackterra/core';
import { LogTransformer } from './log.transformer';
import { TxInfo } from '@terra-money/terra.js';
import { ProtocolType } from '../loader/protocol.interface';

describe('The log transformer ', () => {
  const api = new FCDApi();
  const logTransformer = new LogTransformer();

  it('should transform contract actions', async () => {
    const txInfo: TxInfo = await api.getByTxHash(
      '234933B4943849D380656AF73824ABCA7401A5532AC2D3757AE63AD6AE560217',
    );

    const transformedTx: any = logTransformer.transform(txInfo);
    expect(transformedTx[0]).toHaveProperty('type');
    expect(transformedTx[0]).toHaveProperty('contractActions');

    const transformedTxType = transformedTx[0].type;
    const transformedTxActions: any = transformedTx[0].contractActions;
    expect(transformedTxType).toEqual(ProtocolType.Contract);
    expect(transformedTxActions).toHaveProperty('transfer');
  });
});
