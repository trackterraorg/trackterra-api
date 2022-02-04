import { FeeParser } from './fee.parser';

const amount = [
  {
    denom: 'ukrw',
    amount: '24956190',
  },
  {
    denom: 'uusd',
    amount: '1000000',
  },
];

describe('The fee parser ', () => {
  it('should parse fee values', async () => {
    const parsedFee = FeeParser.process(amount);

    expect(parsedFee).toMatchObject([
      {
        token: 'ukrw',
        amount: '24956190',
      },
      {
        token: 'uusd',
        amount: '1000000',
      },
    ]);
  });

  it('should handle empty fee values', async () => {
    let amount = '';
    const parsedFee = FeeParser.process([]);

    expect(parsedFee).toEqual(undefined);
  });
});
