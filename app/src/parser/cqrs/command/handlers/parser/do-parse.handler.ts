import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DoParseCommand } from '../../impl';
import { AccAddress } from '@terra-money/terra.js';
import { TTParserService } from '@trackterra/core/services/others/parser.service';
import { WalletsService } from '@trackterra/app/wallets/wallets.service';
import { CurrenciesService } from '@trackterra/app/currencies/currencies.service';
import {
  txToTxCreateRequest,
  txToUnparsedTxCreateRequest,
} from '@trackterra/app/parser/common/parser-mapper.utils';
import _ = require('lodash');
import { FCDApiService } from '@trackterra/app/api/fcd-api.service';
import { ParseWalletResponse } from '@trackterra/app/parser/parser.types';
import { ParsingStatus } from '@trackterra/repository/enums/parsing-status.enum';

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

    const { chain, address, highestParsedBlockHeight } = command.input;
    try {
      if (!AccAddress.validate(address)) {
        throw new BadRequestException('Invalid terra account address');
      }

      const prevHighestParsedBlockHeight = highestParsedBlockHeight;

      let next: number;

      let newHighestBlockHeight = prevHighestParsedBlockHeight;

      let parsedTxs = [];
      let unparsedTxs = [];
      let numberOfNewParsedTxs = 0;

      while (true) {
        this.logger.log('Fetching txs from fcd ');

        const result = await this.fcdApiService.api(chain).getByAccount({
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
            this.logger.log(`Started parsing tx: ${tx.txhash}`);
            const result = await this.parserService.parseTx(address, tx);

            if (_.isEmpty(result)) {
              const unparsedTx = await txToUnparsedTxCreateRequest(
                chain,
                address,
                tx,
              );
              unparsedTxs = unparsedTxs.concat(unparsedTx);
              continue;
            }

            this.logger.log(`Finished parsing tx: ${tx.txhash}`);
            numberOfNewParsedTxs++;
            for (const resultTx of result) {
              const mappedResult = await txToTxCreateRequest(
                resultTx,
                chain,
                address,
                this.currenciesService,
              );
              // parsedTxs = parsedTxs.concat(mappedResult);
              this.walletService.createTxs({
                txs: [mappedResult],
              });
            }
          } catch (e) {
            const unparsedTx = await txToUnparsedTxCreateRequest(
              chain,
              address,
              tx,
            );
            // unparsedTxs = unparsedTxs.concat(unparsedTx);
            this.walletService.createTxs({
              txs: [unparsedTx],
            });
            this.logger.error(e);
          } finally {
            if (tx.height > newHighestBlockHeight) {
              newHighestBlockHeight = tx.height;
            }
          }
        }

        // _(parsedTxs.concat(unparsedTxs))
        //   .chunk(10)
        //   .forEach((parsedTxsChunk) => {
        //     this.walletService.createTxs({
        //       txs: parsedTxsChunk,
        //     });
        //   });

        parsedTxs = [];
        unparsedTxs = [];

        next = result.next ?? 0;

        if (next <= prevHighestParsedBlockHeight) {
          break;
        }
      }

      this.walletService.updateWallet({
        chain,
        address,
        highestParsedBlock: newHighestBlockHeight,
        status: ParsingStatus.DONE,
      });

      return {
        numberOfNewParsedTxs,
        status: ParsingStatus.DONE,
        msg: 'Handled by the job',
      };
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
