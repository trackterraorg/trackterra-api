import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ParseWalletCommand } from '../../impl';
import { RpcException } from '@nestjs/microservices';
import { WalletParsedEvent } from '@trackterra/core/cqrs';
import { ParseWalletResponse } from '@trackterra/proto-schema/parser';
import { AccAddress } from '@terra-money/terra.js';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import * as _ from 'lodash';
import moment = require('moment');

import { ParsingStatus } from '@trackterra/proto-schema/wallet';
import {
  PARSING_QUEUE_NAME,
} from 'server/service-parser/src/parser/parser.constants';
import { ContractRpcClientService, FCDApiService, WalletsRpcClientService } from '@trackterra/core';
import { TTParserService } from '@trackterra/core/services/others/parser.service';
import { txToTxCreateRequest, txToUnparsedTxCreateRequest } from 'server/service-parser/src/parser/common/parser-mapper.utils';

/**
 * @class
 * @implements {ICommandHandler<ParseWalletCommand>}
 */
@CommandHandler(ParseWalletCommand)
export class ParseWalletHandler implements ICommandHandler<ParseWalletCommand> {
  logger = new Logger(this.constructor.name);
  /**
   * @constructor
   * @param eventBus {EventBus}
   */
  public constructor(
    @InjectQueue(PARSING_QUEUE_NAME) readonly queue: Queue,
    private readonly fcdApiService: FCDApiService,
    private readonly parserService: TTParserService,
    private readonly walletRpcService: WalletsRpcClientService,
    private readonly currencyRpcClientService: ContractRpcClientService,
  ) {}

  /**
   * @param command {ParseWalletCommand}
   */
  async execute(command: ParseWalletCommand): Promise<ParseWalletResponse> {
    this.logger.log(`Async ${command.constructor.name}...`);

    const { address, highestParsedBlockHeight } = command.input;
    try {
      if (!AccAddress.validate(address)) {
        throw new RpcException('Invalid terra account address');
      }

      const prevHighestParsedBlockHeight = highestParsedBlockHeight;

      let next: number;

      let newHighestBlockHeight = prevHighestParsedBlockHeight;

      let parsedTxs = [];
      let unparsedTxs = [];
      let numberOfNewParsedTxs = 0;

      while (true) {
        this.logger.log('Fetching txs from fcd ');

        const result = await this.fcdApiService.api.getByAccount({
          account: address,
          limit: 100,
          offset: next,
        });

        const txsToBeParsed = result.txs.filter(
          (tx) => tx.height > prevHighestParsedBlockHeight,
        );

        if (!txsToBeParsed.length) {
          break;
        }

        for await (const tx of txsToBeParsed) {
          try {
            const result = await this.parserService.parseTx(address, tx);

            if (_.isEmpty(result)) {
              const unparsedTx = await txToUnparsedTxCreateRequest(tx, address);
              unparsedTxs = unparsedTxs.concat(unparsedTx);
              continue;
            }

            this.logger.log(`Parsed tx: ${tx.txhash}`);
            numberOfNewParsedTxs++;
            for (const resultTx of result) {
              const mappedResult = await txToTxCreateRequest(
                resultTx,
                address,
                this.currencyRpcClientService,
              );
              parsedTxs = parsedTxs.concat(mappedResult);
            }
          } catch (e) {
            const unparsedTx = await txToUnparsedTxCreateRequest(tx, address);
            unparsedTxs = unparsedTxs.concat(unparsedTx);
            this.logger.error(e);
          } finally {
            if (tx.height > newHighestBlockHeight) {
              newHighestBlockHeight = tx.height;
            }
          }
        }

        _(parsedTxs.concat(unparsedTxs))
          .chunk(10)
          .forEach((parsedTxsChunk) => {
            this.walletRpcService.svc
              .createTxs({
                txs: parsedTxsChunk,
              })
              .toPromise();
          });

        parsedTxs = [];
        unparsedTxs = [];

        next = result.next ?? 0;

        if (next <= prevHighestParsedBlockHeight) {
          break;
        }
      }

      this.walletRpcService.svc
        .updateWallet({
          address,
          highestParsedBlock: newHighestBlockHeight,
          status: ParsingStatus.DONE,
        })
        .toPromise();

      const msg = `Parsing completed for wallet address ${address}. ${numberOfNewParsedTxs} new txs parsed!`;

      this.logger.log(msg);

      return {
        numberOfNewParsedTxs,
        status: ParsingStatus.DONE,
        msg,
      };
    } catch (error) {
      this.logger.log(error);
      throw new RpcException(error);
    }
  }
}

