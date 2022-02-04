import { TaxParser } from './tax.parser';

describe('The tax parser ', () => {
  it('should parse tax values', async () => {
    let taxValue = '1400662uusd';
    const parsedTax = TaxParser.process(taxValue);

    expect(parsedTax).toMatchObject({
      amount: '1400662',
      token: 'uusd',
    });
  });

  it('should handle empty tax values', async () => {
    let taxValue = '';
    const parsedTax = TaxParser.process(taxValue);

    expect(parsedTax).toEqual(undefined);
  });
});
