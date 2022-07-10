import { Injectable } from '@nestjs/common';
import { Chain } from '@trackterra/chains/enums/chain.enum';
import * as _ from 'lodash';

@Injectable()
export class ValidatorService {
  public isImage(mimeType: string): boolean {
    const imageMimeTypes = ['image/jpeg', 'image/png'];

    return _.includes(imageMimeTypes, mimeType);
  }

  public isValidChain(chain: Chain): boolean {
    const chains = Object.keys(Chain);

    return _.includes(chains, _.toLower(chain));
  }
}
