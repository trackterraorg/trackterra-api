export abstract class TTException extends Error {
  public constructor(message?: string) {
    super(message);
  }
}

export class ProtocolsNotLoadedException extends TTException {
  public constructor() {
    super('Protocols are not loaded!');
  }
}

export class ParserNotFoundException extends TTException {
  public constructor() {
    super('Parser not found');
  }
}

export class TxTypeNotFoundException extends TTException {
  public constructor() {
    super('Could not classify the tx');
  }
}

export class InvalidDataException extends TTException {
  public constructor(type: string) {
    super(`Invalid ${type}`);
  }
}

export class MissingDataException extends TTException {
  public constructor(type: string) {
    super(`${type} is missing`);
  }
}

export class SeperateAmountFromTokenException extends TTException {
  public constructor() {
    super('Unable to seperate amount from token');
  }
}

export class ToBeDefinedException extends TTException {
  public constructor() {
    super('Parser is missing, undefined or not imported in parser processor');
  }
}

export class UnableToFetchTxInfoException extends TTException {
  public constructor() {
    super('Unable to fetch tx info');
  }
}

export class InvalidTransferException extends TTException {
  public constructor() {
    super('Invalid transfer action');
  }
}

export class UnableToIdentifyTxTypeException extends TTException {
  public constructor() {
    super('Unable to identify transaction type');
  }
}

export class UnableToExtractActionException extends TTException {
  public constructor(type: string) {
    super(`Unable to extract ${type} actions`);
  }
}
