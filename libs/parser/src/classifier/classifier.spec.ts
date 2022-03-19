import { TxInfo } from '@terra-money/terra.js';
import { FCDApi } from '@trackterra/core';
import { UnableToFetchTxInfoException } from '../exceptions';
import { TxStatus } from '../parser/parser.enums';
import { LogTransformer, TransformedEvents } from '../transformers';
import { Classifier } from './classifier';

const api = new FCDApi();
const logTransformer = new LogTransformer();

describe('The classifier ', () => {
  it('should classify tx', async () => {
    const txInfo: TxInfo | undefined = await api.getByTxHash(
      '27553BBAB5E0D8CFEE2507078696D8C7B8E7ADA40EABCBEA666ADD3FF676EE61',
    );

    if (txInfo === undefined) {
      throw new UnableToFetchTxInfoException();
    }

    const actions: TransformedEvents[] | TxStatus.Failed =
      logTransformer.transform(txInfo).events;

    const { txType } = await Classifier.classify(actions[0] as any);
    expect(txType).toHaveProperty('classifier');
  });

  it('should classify failed tx', async () => {
    const txInfo: TxInfo | undefined = await api.getByTxHash(
      '5B6A4A6FAD1F33353584EAB2BB923EEE17015459C70166D1EE95D0CA727ED911',
    );

    if (txInfo === undefined) {
      throw new UnableToFetchTxInfoException();
    }

    const actions: TransformedEvents[] =
      logTransformer.transform(txInfo).events;

    const { txType } = await Classifier.classify(actions[0]);
    expect(txType).toHaveProperty('classifier');
  });
});
