import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { TxsParsedEvent } from '@trackterra/core';
// import { CreateTxsCommand } from '../cqrs';

@Injectable()
export class TxsParsedSaga {
  constructor() {}

  @Saga()
  txsParsedSaga = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(TxsParsedEvent),
      delay(500),
      map((event) => {
        console.log({
          sdfsd: 'hhhhhhhhhhhhhhhhhhhh',
        });

        return null;
        // const txs: CreateTxRequest[] = event.parsedTx.map(
        //   (tx) => tx as unknown as CreateTxRequest,
        // );
        // return new CreateTxsCommand({ txs });
      }),
    );
  };
}
