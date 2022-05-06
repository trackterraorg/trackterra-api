import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { walletsDir } from '@trackterra/common';

@Injectable()
export class AppService {
  logger = new Logger(this.constructor.name);

  getHello(): string {
    return 'You just reached rainsack. Keep looking at the screen, and you will see a green dot';
  }

  /**
   * Check if wallets directory exists
   * the exported csv files are stored in this directory
   */
  checkWalletsDirectory() {
    const fs = require('fs');

    // check if directory exists
    fs.access(walletsDir(), (err: any) => {
      if (err) {
        this.logger.error(
          'Wallets directory does not exist. Please create storage/wallets in root directory.',
        );
      } else {
        this.logger.log('Wallets directory exist');
      }
    });
  }
}
