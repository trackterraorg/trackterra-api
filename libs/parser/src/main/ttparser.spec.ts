import { TxInfo } from '@terra-money/terra.js';
import { FCDApi } from '@trackterra/core';
import { TxLabel } from '../parser';
import { TTParser } from './ttparser';

const api = new FCDApi();

describe('The tt main should', () => {
  it('parse txs by their TxInfo', async () => {
    const txInfo: TxInfo = await api.getByTxHash(
      '47AF52C4EF5229796F4BCD315EAF6A36C9E4830C1339C63B68C076BC87634D00',
    );

    const result = await TTParser.parse(
      'terra1rk665gs04w7spmej846rsxfg0gssg2m9k3ymnd',
      txInfo,
    );

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          // walletAddress: "terra1rk665gs04w7spmej846rsxfg0gssg2m9k3ymnd",
          blockHeight: '5409449',
          txhash:
            '47AF52C4EF5229796F4BCD315EAF6A36C9E4830C1339C63B68C076BC87634D00',
          timestamp: '2021-11-23T16:34:36Z',
          label: TxLabel.Withdraw,
          sentAmount: '1000000',
          sentToken: 'uluna',
          recipient: 'terra1tpw4wyfdnyfarrssrpjwjjqna6ph67ee89u74p',
          feeAmount: '1186',
          feeToken: 'uluna',
        }),
      ]),
    );
  });
});
