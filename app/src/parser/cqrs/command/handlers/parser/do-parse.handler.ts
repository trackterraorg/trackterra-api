import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DoParseCommand } from '../../impl';
import { RpcException } from '@nestjs/microservices';
import { ParseWalletResponse } from '@trackterra/proto-schema/parser';
import { AccAddress } from '@terra-money/terra.js';
import { ParsingStatus } from '@trackterra/proto-schema/wallet';
import { FCDApiService } from '@trackterra/core';
import { TTParserService } from '@trackterra/core/services/others/parser.service';
import { WalletsService } from '@trackterra/app/wallets/wallets.service';
import { CurrenciesService } from '@trackterra/app/currencies/currencies.service';
import { txToTxCreateRequest, txToUnparsedTxCreateRequest } from '@trackterra/app/parser/common/parser-mapper.utils';
import _ = require('lodash');

/**
 * @class
 * @implements {ICommandHandler<DoParseCommand>}
 */
@CommandHandler(DoParseCommand)
export class DoParseHandler implements ICommandHandler<DoParseCommand> {
  logger = new Logger(this.constructor.name);
  public constructor(
    private readonly fcdApiService: FCDApiService,
    private readonly parserService: TTParserService,
    private readonly walletService: WalletsService,
    private readonly currenciesService: CurrenciesService,
  ) {}

  /**
   * @param command {DoParseCommand}
   */
  async execute(command: DoParseCommand): Promise<ParseWalletResponse> {
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
                this.currenciesService,
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
            this.walletService.createTxs({
              txs: parsedTxsChunk,
            });
          });

        parsedTxs = [];
        unparsedTxs = [];

        next = result.next ?? 0;

        if (next <= prevHighestParsedBlockHeight) {
          break;
        }
      }

      this.walletService.updateWallet({
        address,
        highestParsedBlock: newHighestBlockHeight,
        status: ParsingStatus.DONE,
      });

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
