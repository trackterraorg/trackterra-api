import { GenericTransfer, TransferEngine } from './transfer';

export abstract class Farm {
  protected objTransfer: GenericTransfer;

  constructor() {
    this.objTransfer = new GenericTransfer();
  }
}


/**
 * Extract from contract actions
 */
export const Farms = {
};
