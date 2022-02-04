import { Injectable } from '@nestjs/common';
import { TxInfo } from '@terra-money/terra.js';
import { TTParser } from '@trackterra/parser';

@Injectable()
export class TTParserService {
  constructor(private readonly parser: TTParser) {}

  async parseTx(walletAddress: string, txInfo: TxInfo) {
    const parsedTx = await TTParser.parse(walletAddress, txInfo);
    return parsedTx;
  }
}
