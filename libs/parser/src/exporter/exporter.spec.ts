import { TxInfo, TxLog } from '@terra-money/terra.js';
import { IAmount, IParsedTx, Parser, TxLabel } from '../parser';
import { FCDApi } from '@trackterra/core';
import { Classifier } from '../classifier/classifier';
import { LogTransformer, TransformedEvents } from '../transformers';
import { TaxParser } from '../parser/tax.parser';
import { FeeParser } from '../parser/fee.parser';
import { Exporter } from '../exporter/exporter';
import config from '@trackterra/core/services/configs/config';
import { FCDApiService } from '@trackterra/app/api/fcd-api.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { Chain } from '@trackterra/chains/enums/chain.enum';

const logTransformer = new LogTransformer();

describe('The exporter should', () => {
  let fcdApiService: FCDApiService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FCDApiService],
      imports: [
        ConfigModule.forRoot({
          load: [config],
          isGlobal: true,
        }),
      ],
    }).compile();

    fcdApiService = module.get<FCDApiService>(FCDApiService);
  });

  it('export result in singular formatted type', async () => {
    const api = fcdApiService.api(Chain.lunc);

    const txInfo: TxInfo = await api.getByTxHash(
      '47AF52C4EF5229796F4BCD315EAF6A36C9E4830C1339C63B68C076BC87634D00',
    );

    const transformedActions: TransformedEvents[] =
      logTransformer.transform(txInfo).events;

    let txs: {
      txIndex: number;
      records: IParsedTx[];
      tax?: IAmount;
    }[] = [];

    const walletAddress = 'terra1rk665gs04w7spmej846rsxfg0gssg2m9k3ymnd';

    for (let index = 0; index < transformedActions.length; index++) {
      const transformedAction = transformedActions[index];

      const { txType } = await Classifier.classify(transformedAction);

      const records = Parser.process({
        txType,
        walletAddress,
        ...transformedAction,
      });

      txs = txs.concat({
        txIndex: index,
        records,
      });
    }

    // tax for each tx, based on log
    const logs: TxLog[] | undefined = txInfo.logs;
    const taxes = logs?.map((log) => {
      if (log) {
        if (log?.log === undefined) {
          return;
        }
        const objTax: any = eval(log.log);
        return TaxParser.process(objTax?.tax);
      }
    });

    const tx: any = txInfo.tx;
    const fees: IAmount[] | undefined = FeeParser.process(
      tx.value?.fee?.amount,
    );

    const d = {
      txInfo,
      walletAddress,
      txs,
      fees,
      taxes,
    };

    const records = Exporter.format(d);

    expect(records).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: TxLabel.Withdraw,
          sentAmount: '1000000',
          sentToken: 'uluna',
        }),
      ]),
    );
  });
});
