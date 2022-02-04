import { IAmount } from './parser.interfaces';

export class FeeParser {
  static process(
    amount:
      | {
          denom: string;
          amount: string;
        }[]
      | [],
  ): IAmount[] | undefined {
    if (amount.length === 0) {
      return undefined;
    }

    const fees = amount.map((fee) => {
      const token = fee.denom;
      const amount = fee.amount;

      return {
        token,
        amount,
      };
    });

    return fees;
  }
}
