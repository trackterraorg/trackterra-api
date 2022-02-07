/* eslint-disable */
import { Observable } from 'rxjs';
import { Writer, Reader } from 'protobufjs/minimal';


export interface RestPaginate {
  skip: number;
  limit: number;
}

export interface GQLPaginate {
  first: number;
  last: number;
  after: string;
  before: string;
}

export interface Paginate {
  rest: RestPaginate | undefined;
  gql: GQLPaginate | undefined;
}

export interface Wallet {
  id: string;
  address: string;
  highestParsedBlock: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface WalletExtras {
  sAddress: string;
  parsed: boolean;
}

export interface ReadWalletRequest {
  address: string;
}

export interface ReadWalletResponse {
  wallet: Wallet | undefined;
  extras: WalletExtras | undefined;
}

export interface ReadWalletDetailRequest {
  address: string;
}

export interface TopActiveContract {
  contract: string;
  count: number;
}

export interface TopOperation {
  operation: string;
  count: number;
}

export interface ReadWalletDetailResponse {
  address: string;
  txCount: number;
  unclassifiedTxCount: number;
  lastParsingTime: string;
  highestParsedBlock: number;
  topActiveContracts: TopActiveContract[];
  topOperations: TopOperation[];
}

export interface FindWalletsRequest {
  filter: string;
  paginate: RestPaginate | undefined;
}

export interface FindWalletsResponse {
  wallets: Wallet[];
}

export interface ParseWalletRequest {
  address: string;
}

export interface ParseWalletResponse {
  numberOfNewParsedTxs: number;
  status: ParsingStatus;
  msg: string;
}

/**
 *  s: Short
 *  r: Readable
 */
export interface TxExtra {
  sTxHash: string;
  rTimestamp: string;
  sWalletAddress: string;
  sContract: string;
  sSender: string;
  sRecipient: string;
}

export interface Tx {
  id: string;
  txhash: string;
  blockHeight: string;
  timestamp: string;
  label: string;
  tag: string;
  walletAddress: string;
  contract: string;
  sender: string;
  recipient: string;
  receivedAmount: string;
  receivedToken: string;
  sentAmount: string;
  sentToken: string;
  feeAmount: string;
  feeToken: string;
  taxAmount: string;
  taxToken: string;
  netWorthAmount: string;
  netWorthToken: string;
  memo: string;
  friendlyDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface TxCointracker {
  id: string;
  timestamp: string;
  receivedAmount: string;
  receivedToken: string;
  sentAmount: string;
  sentToken: string;
  feeAmount: string;
  feeToken: string;
  label: string;
  tag: string;
}

export interface TxKoinly {
  id: string;
  txhash: string;
  timestamp: string;
  label: string;
  tag: string;
  receivedAmount: string;
  receivedToken: string;
  sentAmount: string;
  sentToken: string;
  feeAmount: string;
  feeToken: string;
  netWorthAmount: string;
  netWorthToken: string;
  friendlyDescription: string;
}

export interface TxNode {
  tx: Tx | undefined;
  extras: TxExtra | undefined;
}

export interface TxKoinlyNode {
  tx: TxKoinly | undefined;
  extras: TxExtra | undefined;
}

export interface TxCointrackerNode {
  tx: TxCointracker | undefined;
  extras: TxExtra | undefined;
}

export interface TxEdge {
  cursor: string;
  node: TxNode | undefined;
}

export interface PageInfo {
  pageInfo: string;
  hasNextPage: string;
  hasPreviousPage: string;
  endCursor: string;
  startCursor: string;
}

export interface CreateTxRequest {
  txhash: string;
  blockHeight: string;
  timestamp: string;
  label: string;
  tag: string;
  walletAddress: string;
  contract: string;
  sender: string;
  recipient: string;
  receivedAmount: string;
  receivedToken: string;
  sentAmount: string;
  sentToken: string;
  feeAmount: string;
  feeToken: string;
  taxAmount: string;
  taxToken: string;
  netWorthAmount: string;
  netWorthToken: string;
  memo: string;
  friendlyDescription: string;
}

export interface CreateTxResponse {
  tx: Tx | undefined;
}

export interface CreateTxsRequest {
  txs: CreateTxRequest[];
}

export interface CreateTxsResponse {
  status: ParsingStatus;
}

export interface DeleteTxRequest {
  id: string;
}

export interface DeleteTxResponse {
  tx: Tx | undefined;
}

export interface ReadTxRequest {
  filter: string;
}

export interface ReadTxResponse {
  tx: Tx | undefined;
}

export interface FindTxsRequest {
  address: string;
  filter: string;
  paginate: RestPaginate | undefined;
  order: string;
  orderBy: string;
  csv: boolean;
}

export interface FindTxsResponse {
  txs: TxNode[];
  totalCount: number;
}

export interface FindTxsResponseKoinly {
  txs: TxKoinlyNode[];
  totalCount: number;
}

export interface FindTxsResponseCointracker {
  txs: TxCointrackerNode[];
  totalCount: number;
}

export interface PickUnparsedTxsRequest {
  txhashes: string[];
}

export interface PickUnparsedTxsResponse {
  txhashes: string[];
}

export interface UpdateWalletRequest {
  highestParsedBlock: number;
  status: number;
  address: string;
}

export interface UpdateWalletResponse {
  wallet: Wallet | undefined;
}

const baseRestPaginate: object = {
  skip: 0,
  limit: 0,
};

const baseGQLPaginate: object = {
  first: 0,
  last: 0,
  after: '',
  before: '',
};

const basePaginate: object = {
  rest: undefined,
  gql: undefined,
};

const baseWallet: object = {
  id: '',
  address: '',
  highestParsedBlock: 0,
  status: 0,
  createdAt: '',
  updatedAt: '',
};

const baseWalletExtras: object = {
  sAddress: '',
  parsed: false,
};

const baseReadWalletRequest: object = {
  address: '',
};

const baseReadWalletResponse: object = {
  wallet: undefined,
  extras: undefined,
};

const baseReadWalletDetailRequest: object = {
  address: '',
};

const baseTopActiveContract: object = {
  contract: '',
  count: 0,
};

const baseTopOperation: object = {
  operation: '',
  count: 0,
};

const baseReadWalletDetailResponse: object = {
  address: '',
  txCount: 0,
  unclassifiedTxCount: 0,
  lastParsingTime: '',
  highestParsedBlock: 0,
  topActiveContracts: undefined,
  topOperations: undefined,
};

const baseFindWalletsRequest: object = {
  filter: '',
  paginate: undefined,
};

const baseFindWalletsResponse: object = {
  wallets: undefined,
};

const baseParseWalletRequest: object = {
  address: '',
};

const baseParseWalletResponse: object = {
  numberOfNewParsedTxs: 0,
  status: 0,
  msg: '',
};

const baseTxExtra: object = {
  sTxHash: '',
  rTimestamp: '',
  sWalletAddress: '',
  sContract: '',
  sSender: '',
  sRecipient: '',
};

const baseTx: object = {
  id: '',
  txhash: '',
  blockHeight: '',
  timestamp: '',
  label: '',
  tag: '',
  walletAddress: '',
  contract: '',
  sender: '',
  recipient: '',
  receivedAmount: '',
  receivedToken: '',
  sentAmount: '',
  sentToken: '',
  feeAmount: '',
  feeToken: '',
  taxAmount: '',
  taxToken: '',
  netWorthAmount: '',
  netWorthToken: '',
  memo: '',
  friendlyDescription: '',
  createdAt: '',
  updatedAt: '',
};

const baseTxCointracker: object = {
  id: '',
  timestamp: '',
  receivedAmount: '',
  receivedToken: '',
  sentAmount: '',
  sentToken: '',
  feeAmount: '',
  feeToken: '',
  label: '',
  tag: '',
};

const baseTxKoinly: object = {
  id: '',
  txhash: '',
  timestamp: '',
  label: '',
  tag: '',
  receivedAmount: '',
  receivedToken: '',
  sentAmount: '',
  sentToken: '',
  feeAmount: '',
  feeToken: '',
  netWorthAmount: '',
  netWorthToken: '',
  friendlyDescription: '',
};

const baseTxNode: object = {
  tx: undefined,
  extras: undefined,
};

const baseTxKoinlyNode: object = {
  tx: undefined,
  extras: undefined,
};

const baseTxCointrackerNode: object = {
  tx: undefined,
  extras: undefined,
};

const baseTxEdge: object = {
  cursor: '',
  node: undefined,
};

const basePageInfo: object = {
  pageInfo: '',
  hasNextPage: '',
  hasPreviousPage: '',
  endCursor: '',
  startCursor: '',
};

const baseCreateTxRequest: object = {
  txhash: '',
  blockHeight: '',
  timestamp: '',
  label: '',
  tag: '',
  walletAddress: '',
  contract: '',
  sender: '',
  recipient: '',
  receivedAmount: '',
  receivedToken: '',
  sentAmount: '',
  sentToken: '',
  feeAmount: '',
  feeToken: '',
  taxAmount: '',
  taxToken: '',
  netWorthAmount: '',
  netWorthToken: '',
  memo: '',
  friendlyDescription: '',
};

const baseCreateTxResponse: object = {
  tx: undefined,
};

const baseCreateTxsRequest: object = {
  txs: undefined,
};

const baseCreateTxsResponse: object = {
  status: 0,
};

const baseDeleteTxRequest: object = {
  id: '',
};

const baseDeleteTxResponse: object = {
  tx: undefined,
};

const baseReadTxRequest: object = {
  filter: '',
};

const baseReadTxResponse: object = {
  tx: undefined,
};

const baseFindTxsRequest: object = {
  address: '',
  filter: '',
  paginate: undefined,
  order: '',
  orderBy: '',
  csv: false,
};

const baseFindTxsResponse: object = {
  txs: undefined,
  totalCount: 0,
};

const baseFindTxsResponseKoinly: object = {
  txs: undefined,
  totalCount: 0,
};

const baseFindTxsResponseCointracker: object = {
  txs: undefined,
  totalCount: 0,
};

const basePickUnparsedTxsRequest: object = {
  txhashes: '',
};

const basePickUnparsedTxsResponse: object = {
  txhashes: '',
};

const baseUpdateWalletRequest: object = {
  highestParsedBlock: 0,
  status: 0,
  address: '',
};

const baseUpdateWalletResponse: object = {
  wallet: undefined,
};

export interface WalletService<Context extends DataLoaders> {

  parseWallet(request: ParseWalletRequest, ctx: Context): Promise<ParseWalletResponse>;

  createTxs(request: CreateTxsRequest, ctx: Context): Promise<CreateTxsResponse>;

  readWallet(request: ReadWalletRequest, ctx: Context): Promise<ReadWalletResponse>;

  updateWallet(request: UpdateWalletRequest, ctx: Context): Promise<UpdateWalletResponse>;

  readWalletDetail(request: ReadWalletDetailRequest, ctx: Context): Promise<ReadWalletDetailResponse>;

  findWallets(request: FindWalletsRequest, ctx: Context): Promise<FindWalletsResponse>;

  createTx(request: CreateTxRequest, ctx: Context): Promise<CreateTxResponse>;

  deleteTx(request: DeleteTxRequest, ctx: Context): Promise<DeleteTxResponse>;

  readTx(request: ReadTxRequest, ctx: Context): Promise<ReadTxResponse>;

  findTxs(request: FindTxsRequest, ctx: Context): Promise<FindTxsResponse>;

  pickUnparsedTxs(request: PickUnparsedTxsRequest, ctx: Context): Promise<PickUnparsedTxsResponse>;

}

export interface WalletServiceClient<Context extends DataLoaders> {

  parseWallet(request: ParseWalletRequest, ctx?: Context): Observable<ParseWalletResponse>;

  createTxs(request: CreateTxsRequest, ctx?: Context): Observable<CreateTxsResponse>;

  readWallet(request: ReadWalletRequest, ctx?: Context): Observable<ReadWalletResponse>;

  updateWallet(request: UpdateWalletRequest, ctx?: Context): Observable<UpdateWalletResponse>;

  readWalletDetail(request: ReadWalletDetailRequest, ctx?: Context): Observable<ReadWalletDetailResponse>;

  findWallets(request: FindWalletsRequest, ctx?: Context): Observable<FindWalletsResponse>;

  createTx(request: CreateTxRequest, ctx?: Context): Observable<CreateTxResponse>;

  deleteTx(request: DeleteTxRequest, ctx?: Context): Observable<DeleteTxResponse>;

  readTx(request: ReadTxRequest, ctx?: Context): Observable<ReadTxResponse>;

  findTxs(request: FindTxsRequest, ctx?: Context): Observable<FindTxsResponse>;

  pickUnparsedTxs(request: PickUnparsedTxsRequest, ctx?: Context): Observable<PickUnparsedTxsResponse>;

}

interface DataLoaders {

  getDataLoader<T>(identifier: string, constructorFn: () => T): T;

}

export const ParsingStatus = {
  PARSING: 0 as ParsingStatus,
  DONE: 1 as ParsingStatus,
  FAILED: 2 as ParsingStatus,
  fromJSON(object: any): ParsingStatus {
    switch (object) {
      case 0:
      case "PARSING":
        return ParsingStatus.PARSING;
      case 1:
      case "DONE":
        return ParsingStatus.DONE;
      case 2:
      case "FAILED":
        return ParsingStatus.FAILED;
      default:
        throw new global.Error(`Invalid value ${object}`);
    }
  },
  toJSON(object: ParsingStatus): string {
    switch (object) {
      case ParsingStatus.PARSING:
        return "PARSING";
      case ParsingStatus.DONE:
        return "DONE";
      case ParsingStatus.FAILED:
        return "FAILED";
      default:
        return "UNKNOWN";
    }
  },
}

export type ParsingStatus = 0 | 1 | 2;

export const RestPaginate = {
  encode(message: RestPaginate, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.skip);
    writer.uint32(16).int32(message.limit);
    return writer;
  },
  decode(reader: Reader, length?: number): RestPaginate {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseRestPaginate) as RestPaginate;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.skip = reader.int32();
          break;
        case 2:
          message.limit = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): RestPaginate {
    const message = Object.create(baseRestPaginate) as RestPaginate;
    if (object.skip !== undefined && object.skip !== null) {
      message.skip = Number(object.skip);
    } else {
      message.skip = 0;
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = Number(object.limit);
    } else {
      message.limit = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<RestPaginate>): RestPaginate {
    const message = Object.create(baseRestPaginate) as RestPaginate;
    if (object.skip !== undefined && object.skip !== null) {
      message.skip = object.skip;
    } else {
      message.skip = 0;
    }
    if (object.limit !== undefined && object.limit !== null) {
      message.limit = object.limit;
    } else {
      message.limit = 0;
    }
    return message;
  },
  toJSON(message: RestPaginate): unknown {
    const obj: any = {};
    obj.skip = message.skip || 0;
    obj.limit = message.limit || 0;
    return obj;
  },
};

export const GQLPaginate = {
  encode(message: GQLPaginate, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.first);
    writer.uint32(16).int32(message.last);
    writer.uint32(26).string(message.after);
    writer.uint32(34).string(message.before);
    return writer;
  },
  decode(reader: Reader, length?: number): GQLPaginate {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGQLPaginate) as GQLPaginate;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.first = reader.int32();
          break;
        case 2:
          message.last = reader.int32();
          break;
        case 3:
          message.after = reader.string();
          break;
        case 4:
          message.before = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GQLPaginate {
    const message = Object.create(baseGQLPaginate) as GQLPaginate;
    if (object.first !== undefined && object.first !== null) {
      message.first = Number(object.first);
    } else {
      message.first = 0;
    }
    if (object.last !== undefined && object.last !== null) {
      message.last = Number(object.last);
    } else {
      message.last = 0;
    }
    if (object.after !== undefined && object.after !== null) {
      message.after = String(object.after);
    } else {
      message.after = '';
    }
    if (object.before !== undefined && object.before !== null) {
      message.before = String(object.before);
    } else {
      message.before = '';
    }
    return message;
  },
  fromPartial(object: DeepPartial<GQLPaginate>): GQLPaginate {
    const message = Object.create(baseGQLPaginate) as GQLPaginate;
    if (object.first !== undefined && object.first !== null) {
      message.first = object.first;
    } else {
      message.first = 0;
    }
    if (object.last !== undefined && object.last !== null) {
      message.last = object.last;
    } else {
      message.last = 0;
    }
    if (object.after !== undefined && object.after !== null) {
      message.after = object.after;
    } else {
      message.after = '';
    }
    if (object.before !== undefined && object.before !== null) {
      message.before = object.before;
    } else {
      message.before = '';
    }
    return message;
  },
  toJSON(message: GQLPaginate): unknown {
    const obj: any = {};
    obj.first = message.first || 0;
    obj.last = message.last || 0;
    obj.after = message.after || '';
    obj.before = message.before || '';
    return obj;
  },
};

export const Paginate = {
  encode(message: Paginate, writer: Writer = Writer.create()): Writer {
    if (message.rest !== undefined && message.rest !== undefined) {
      RestPaginate.encode(message.rest, writer.uint32(10).fork()).ldelim();
    }
    if (message.gql !== undefined && message.gql !== undefined) {
      GQLPaginate.encode(message.gql, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): Paginate {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(basePaginate) as Paginate;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rest = RestPaginate.decode(reader, reader.uint32());
          break;
        case 2:
          message.gql = GQLPaginate.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Paginate {
    const message = Object.create(basePaginate) as Paginate;
    if (object.rest !== undefined && object.rest !== null) {
      message.rest = RestPaginate.fromJSON(object.rest);
    } else {
      message.rest = undefined;
    }
    if (object.gql !== undefined && object.gql !== null) {
      message.gql = GQLPaginate.fromJSON(object.gql);
    } else {
      message.gql = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Paginate>): Paginate {
    const message = Object.create(basePaginate) as Paginate;
    if (object.rest !== undefined && object.rest !== null) {
      message.rest = RestPaginate.fromPartial(object.rest);
    } else {
      message.rest = undefined;
    }
    if (object.gql !== undefined && object.gql !== null) {
      message.gql = GQLPaginate.fromPartial(object.gql);
    } else {
      message.gql = undefined;
    }
    return message;
  },
  toJSON(message: Paginate): unknown {
    const obj: any = {};
    obj.rest = message.rest ? RestPaginate.toJSON(message.rest) : undefined;
    obj.gql = message.gql ? GQLPaginate.toJSON(message.gql) : undefined;
    return obj;
  },
};

export const Wallet = {
  encode(message: Wallet, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.id);
    writer.uint32(18).string(message.address);
    writer.uint32(24).int32(message.highestParsedBlock);
    writer.uint32(32).int32(message.status);
    writer.uint32(42).string(message.createdAt);
    writer.uint32(50).string(message.updatedAt);
    return writer;
  },
  decode(reader: Reader, length?: number): Wallet {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseWallet) as Wallet;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.highestParsedBlock = reader.int32();
          break;
        case 4:
          message.status = reader.int32();
          break;
        case 5:
          message.createdAt = reader.string();
          break;
        case 6:
          message.updatedAt = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Wallet {
    const message = Object.create(baseWallet) as Wallet;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = '';
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = '';
    }
    if (object.highestParsedBlock !== undefined && object.highestParsedBlock !== null) {
      message.highestParsedBlock = Number(object.highestParsedBlock);
    } else {
      message.highestParsedBlock = 0;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = Number(object.status);
    } else {
      message.status = 0;
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = String(object.createdAt);
    } else {
      message.createdAt = '';
    }
    if (object.updatedAt !== undefined && object.updatedAt !== null) {
      message.updatedAt = String(object.updatedAt);
    } else {
      message.updatedAt = '';
    }
    return message;
  },
  fromPartial(object: DeepPartial<Wallet>): Wallet {
    const message = Object.create(baseWallet) as Wallet;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = '';
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = '';
    }
    if (object.highestParsedBlock !== undefined && object.highestParsedBlock !== null) {
      message.highestParsedBlock = object.highestParsedBlock;
    } else {
      message.highestParsedBlock = 0;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = 0;
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = object.createdAt;
    } else {
      message.createdAt = '';
    }
    if (object.updatedAt !== undefined && object.updatedAt !== null) {
      message.updatedAt = object.updatedAt;
    } else {
      message.updatedAt = '';
    }
    return message;
  },
  toJSON(message: Wallet): unknown {
    const obj: any = {};
    obj.id = message.id || '';
    obj.address = message.address || '';
    obj.highestParsedBlock = message.highestParsedBlock || 0;
    obj.status = message.status || 0;
    obj.createdAt = message.createdAt || '';
    obj.updatedAt = message.updatedAt || '';
    return obj;
  },
};

export const WalletExtras = {
  encode(message: WalletExtras, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.sAddress);
    writer.uint32(24).bool(message.parsed);
    return writer;
  },
  decode(reader: Reader, length?: number): WalletExtras {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseWalletExtras) as WalletExtras;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sAddress = reader.string();
          break;
        case 3:
          message.parsed = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): WalletExtras {
    const message = Object.create(baseWalletExtras) as WalletExtras;
    if (object.sAddress !== undefined && object.sAddress !== null) {
      message.sAddress = String(object.sAddress);
    } else {
      message.sAddress = '';
    }
    if (object.parsed !== undefined && object.parsed !== null) {
      message.parsed = Boolean(object.parsed);
    } else {
      message.parsed = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<WalletExtras>): WalletExtras {
    const message = Object.create(baseWalletExtras) as WalletExtras;
    if (object.sAddress !== undefined && object.sAddress !== null) {
      message.sAddress = object.sAddress;
    } else {
      message.sAddress = '';
    }
    if (object.parsed !== undefined && object.parsed !== null) {
      message.parsed = object.parsed;
    } else {
      message.parsed = false;
    }
    return message;
  },
  toJSON(message: WalletExtras): unknown {
    const obj: any = {};
    obj.sAddress = message.sAddress || '';
    obj.parsed = message.parsed || false;
    return obj;
  },
};

export const ReadWalletRequest = {
  encode(message: ReadWalletRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.address);
    return writer;
  },
  decode(reader: Reader, length?: number): ReadWalletRequest {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseReadWalletRequest) as ReadWalletRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ReadWalletRequest {
    const message = Object.create(baseReadWalletRequest) as ReadWalletRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = '';
    }
    return message;
  },
  fromPartial(object: DeepPartial<ReadWalletRequest>): ReadWalletRequest {
    const message = Object.create(baseReadWalletRequest) as ReadWalletRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = '';
    }
    return message;
  },
  toJSON(message: ReadWalletRequest): unknown {
    const obj: any = {};
    obj.address = message.address || '';
    return obj;
  },
};

export const ReadWalletResponse = {
  encode(message: ReadWalletResponse, writer: Writer = Writer.create()): Writer {
    if (message.wallet !== undefined && message.wallet !== undefined) {
      Wallet.encode(message.wallet, writer.uint32(10).fork()).ldelim();
    }
    if (message.extras !== undefined && message.extras !== undefined) {
      WalletExtras.encode(message.extras, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): ReadWalletResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseReadWalletResponse) as ReadWalletResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.wallet = Wallet.decode(reader, reader.uint32());
          break;
        case 2:
          message.extras = WalletExtras.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ReadWalletResponse {
    const message = Object.create(baseReadWalletResponse) as ReadWalletResponse;
    if (object.wallet !== undefined && object.wallet !== null) {
      message.wallet = Wallet.fromJSON(object.wallet);
    } else {
      message.wallet = undefined;
    }
    if (object.extras !== undefined && object.extras !== null) {
      message.extras = WalletExtras.fromJSON(object.extras);
    } else {
      message.extras = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ReadWalletResponse>): ReadWalletResponse {
    const message = Object.create(baseReadWalletResponse) as ReadWalletResponse;
    if (object.wallet !== undefined && object.wallet !== null) {
      message.wallet = Wallet.fromPartial(object.wallet);
    } else {
      message.wallet = undefined;
    }
    if (object.extras !== undefined && object.extras !== null) {
      message.extras = WalletExtras.fromPartial(object.extras);
    } else {
      message.extras = undefined;
    }
    return message;
  },
  toJSON(message: ReadWalletResponse): unknown {
    const obj: any = {};
    obj.wallet = message.wallet ? Wallet.toJSON(message.wallet) : undefined;
    obj.extras = message.extras ? WalletExtras.toJSON(message.extras) : undefined;
    return obj;
  },
};

export const ReadWalletDetailRequest = {
  encode(message: ReadWalletDetailRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.address);
    return writer;
  },
  decode(reader: Reader, length?: number): ReadWalletDetailRequest {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseReadWalletDetailRequest) as ReadWalletDetailRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ReadWalletDetailRequest {
    const message = Object.create(baseReadWalletDetailRequest) as ReadWalletDetailRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = '';
    }
    return message;
  },
  fromPartial(object: DeepPartial<ReadWalletDetailRequest>): ReadWalletDetailRequest {
    const message = Object.create(baseReadWalletDetailRequest) as ReadWalletDetailRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = '';
    }
    return message;
  },
  toJSON(message: ReadWalletDetailRequest): unknown {
    const obj: any = {};
    obj.address = message.address || '';
    return obj;
  },
};

export const TopActiveContract = {
  encode(message: TopActiveContract, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.contract);
    writer.uint32(16).int32(message.count);
    return writer;
  },
  decode(reader: Reader, length?: number): TopActiveContract {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseTopActiveContract) as TopActiveContract;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contract = reader.string();
          break;
        case 2:
          message.count = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TopActiveContract {
    const message = Object.create(baseTopActiveContract) as TopActiveContract;
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = String(object.contract);
    } else {
      message.contract = '';
    }
    if (object.count !== undefined && object.count !== null) {
      message.count = Number(object.count);
    } else {
      message.count = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<TopActiveContract>): TopActiveContract {
    const message = Object.create(baseTopActiveContract) as TopActiveContract;
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = object.contract;
    } else {
      message.contract = '';
    }
    if (object.count !== undefined && object.count !== null) {
      message.count = object.count;
    } else {
      message.count = 0;
    }
    return message;
  },
  toJSON(message: TopActiveContract): unknown {
    const obj: any = {};
    obj.contract = message.contract || '';
    obj.count = message.count || 0;
    return obj;
  },
};

export const TopOperation = {
  encode(message: TopOperation, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.operation);
    writer.uint32(16).int32(message.count);
    return writer;
  },
  decode(reader: Reader, length?: number): TopOperation {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseTopOperation) as TopOperation;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.operation = reader.string();
          break;
        case 2:
          message.count = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TopOperation {
    const message = Object.create(baseTopOperation) as TopOperation;
    if (object.operation !== undefined && object.operation !== null) {
      message.operation = String(object.operation);
    } else {
      message.operation = '';
    }
    if (object.count !== undefined && object.count !== null) {
      message.count = Number(object.count);
    } else {
      message.count = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<TopOperation>): TopOperation {
    const message = Object.create(baseTopOperation) as TopOperation;
    if (object.operation !== undefined && object.operation !== null) {
      message.operation = object.operation;
    } else {
      message.operation = '';
    }
    if (object.count !== undefined && object.count !== null) {
      message.count = object.count;
    } else {
      message.count = 0;
    }
    return message;
  },
  toJSON(message: TopOperation): unknown {
    const obj: any = {};
    obj.operation = message.operation || '';
    obj.count = message.count || 0;
    return obj;
  },
};

export const ReadWalletDetailResponse = {
  encode(message: ReadWalletDetailResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.address);
    writer.uint32(16).int32(message.txCount);
    writer.uint32(24).int32(message.unclassifiedTxCount);
    writer.uint32(34).string(message.lastParsingTime);
    writer.uint32(40).int32(message.highestParsedBlock);
    for (const v of message.topActiveContracts) {
      TopActiveContract.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.topOperations) {
      TopOperation.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): ReadWalletDetailResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseReadWalletDetailResponse) as ReadWalletDetailResponse;
    message.topActiveContracts = [];
    message.topOperations = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.txCount = reader.int32();
          break;
        case 3:
          message.unclassifiedTxCount = reader.int32();
          break;
        case 4:
          message.lastParsingTime = reader.string();
          break;
        case 5:
          message.highestParsedBlock = reader.int32();
          break;
        case 6:
          message.topActiveContracts.push(TopActiveContract.decode(reader, reader.uint32()));
          break;
        case 7:
          message.topOperations.push(TopOperation.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ReadWalletDetailResponse {
    const message = Object.create(baseReadWalletDetailResponse) as ReadWalletDetailResponse;
    message.topActiveContracts = [];
    message.topOperations = [];
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = '';
    }
    if (object.txCount !== undefined && object.txCount !== null) {
      message.txCount = Number(object.txCount);
    } else {
      message.txCount = 0;
    }
    if (object.unclassifiedTxCount !== undefined && object.unclassifiedTxCount !== null) {
      message.unclassifiedTxCount = Number(object.unclassifiedTxCount);
    } else {
      message.unclassifiedTxCount = 0;
    }
    if (object.lastParsingTime !== undefined && object.lastParsingTime !== null) {
      message.lastParsingTime = String(object.lastParsingTime);
    } else {
      message.lastParsingTime = '';
    }
    if (object.highestParsedBlock !== undefined && object.highestParsedBlock !== null) {
      message.highestParsedBlock = Number(object.highestParsedBlock);
    } else {
      message.highestParsedBlock = 0;
    }
    if (object.topActiveContracts !== undefined && object.topActiveContracts !== null) {
      for (const e of object.topActiveContracts) {
        message.topActiveContracts.push(TopActiveContract.fromJSON(e));
      }
    }
    if (object.topOperations !== undefined && object.topOperations !== null) {
      for (const e of object.topOperations) {
        message.topOperations.push(TopOperation.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ReadWalletDetailResponse>): ReadWalletDetailResponse {
    const message = Object.create(baseReadWalletDetailResponse) as ReadWalletDetailResponse;
    message.topActiveContracts = [];
    message.topOperations = [];
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = '';
    }
    if (object.txCount !== undefined && object.txCount !== null) {
      message.txCount = object.txCount;
    } else {
      message.txCount = 0;
    }
    if (object.unclassifiedTxCount !== undefined && object.unclassifiedTxCount !== null) {
      message.unclassifiedTxCount = object.unclassifiedTxCount;
    } else {
      message.unclassifiedTxCount = 0;
    }
    if (object.lastParsingTime !== undefined && object.lastParsingTime !== null) {
      message.lastParsingTime = object.lastParsingTime;
    } else {
      message.lastParsingTime = '';
    }
    if (object.highestParsedBlock !== undefined && object.highestParsedBlock !== null) {
      message.highestParsedBlock = object.highestParsedBlock;
    } else {
      message.highestParsedBlock = 0;
    }
    if (object.topActiveContracts !== undefined && object.topActiveContracts !== null) {
      for (const e of object.topActiveContracts) {
        message.topActiveContracts.push(TopActiveContract.fromPartial(e));
      }
    }
    if (object.topOperations !== undefined && object.topOperations !== null) {
      for (const e of object.topOperations) {
        message.topOperations.push(TopOperation.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: ReadWalletDetailResponse): unknown {
    const obj: any = {};
    obj.address = message.address || '';
    obj.txCount = message.txCount || 0;
    obj.unclassifiedTxCount = message.unclassifiedTxCount || 0;
    obj.lastParsingTime = message.lastParsingTime || '';
    obj.highestParsedBlock = message.highestParsedBlock || 0;
    if (message.topActiveContracts) {
      obj.topActiveContracts = message.topActiveContracts.map(e => e ? TopActiveContract.toJSON(e) : undefined);
    } else {
      obj.topActiveContracts = [];
    }
    if (message.topOperations) {
      obj.topOperations = message.topOperations.map(e => e ? TopOperation.toJSON(e) : undefined);
    } else {
      obj.topOperations = [];
    }
    return obj;
  },
};

export const FindWalletsRequest = {
  encode(message: FindWalletsRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.filter);
    if (message.paginate !== undefined && message.paginate !== undefined) {
      RestPaginate.encode(message.paginate, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): FindWalletsRequest {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseFindWalletsRequest) as FindWalletsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.filter = reader.string();
          break;
        case 2:
          message.paginate = RestPaginate.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): FindWalletsRequest {
    const message = Object.create(baseFindWalletsRequest) as FindWalletsRequest;
    if (object.filter !== undefined && object.filter !== null) {
      message.filter = String(object.filter);
    } else {
      message.filter = '';
    }
    if (object.paginate !== undefined && object.paginate !== null) {
      message.paginate = RestPaginate.fromJSON(object.paginate);
    } else {
      message.paginate = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<FindWalletsRequest>): FindWalletsRequest {
    const message = Object.create(baseFindWalletsRequest) as FindWalletsRequest;
    if (object.filter !== undefined && object.filter !== null) {
      message.filter = object.filter;
    } else {
      message.filter = '';
    }
    if (object.paginate !== undefined && object.paginate !== null) {
      message.paginate = RestPaginate.fromPartial(object.paginate);
    } else {
      message.paginate = undefined;
    }
    return message;
  },
  toJSON(message: FindWalletsRequest): unknown {
    const obj: any = {};
    obj.filter = message.filter || '';
    obj.paginate = message.paginate ? RestPaginate.toJSON(message.paginate) : undefined;
    return obj;
  },
};

export const FindWalletsResponse = {
  encode(message: FindWalletsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.wallets) {
      Wallet.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): FindWalletsResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseFindWalletsResponse) as FindWalletsResponse;
    message.wallets = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.wallets.push(Wallet.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): FindWalletsResponse {
    const message = Object.create(baseFindWalletsResponse) as FindWalletsResponse;
    message.wallets = [];
    if (object.wallets !== undefined && object.wallets !== null) {
      for (const e of object.wallets) {
        message.wallets.push(Wallet.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<FindWalletsResponse>): FindWalletsResponse {
    const message = Object.create(baseFindWalletsResponse) as FindWalletsResponse;
    message.wallets = [];
    if (object.wallets !== undefined && object.wallets !== null) {
      for (const e of object.wallets) {
        message.wallets.push(Wallet.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: FindWalletsResponse): unknown {
    const obj: any = {};
    if (message.wallets) {
      obj.wallets = message.wallets.map(e => e ? Wallet.toJSON(e) : undefined);
    } else {
      obj.wallets = [];
    }
    return obj;
  },
};

export const ParseWalletRequest = {
  encode(message: ParseWalletRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.address);
    return writer;
  },
  decode(reader: Reader, length?: number): ParseWalletRequest {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseParseWalletRequest) as ParseWalletRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ParseWalletRequest {
    const message = Object.create(baseParseWalletRequest) as ParseWalletRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = '';
    }
    return message;
  },
  fromPartial(object: DeepPartial<ParseWalletRequest>): ParseWalletRequest {
    const message = Object.create(baseParseWalletRequest) as ParseWalletRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = '';
    }
    return message;
  },
  toJSON(message: ParseWalletRequest): unknown {
    const obj: any = {};
    obj.address = message.address || '';
    return obj;
  },
};

export const ParseWalletResponse = {
  encode(message: ParseWalletResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.numberOfNewParsedTxs);
    writer.uint32(16).int32(message.status);
    writer.uint32(26).string(message.msg);
    return writer;
  },
  decode(reader: Reader, length?: number): ParseWalletResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseParseWalletResponse) as ParseWalletResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.numberOfNewParsedTxs = reader.int32();
          break;
        case 2:
          message.status = reader.int32() as any;
          break;
        case 3:
          message.msg = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ParseWalletResponse {
    const message = Object.create(baseParseWalletResponse) as ParseWalletResponse;
    if (object.numberOfNewParsedTxs !== undefined && object.numberOfNewParsedTxs !== null) {
      message.numberOfNewParsedTxs = Number(object.numberOfNewParsedTxs);
    } else {
      message.numberOfNewParsedTxs = 0;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = ParsingStatus.fromJSON(object.status);
    } else {
      message.status = 0;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = String(object.msg);
    } else {
      message.msg = '';
    }
    return message;
  },
  fromPartial(object: DeepPartial<ParseWalletResponse>): ParseWalletResponse {
    const message = Object.create(baseParseWalletResponse) as ParseWalletResponse;
    if (object.numberOfNewParsedTxs !== undefined && object.numberOfNewParsedTxs !== null) {
      message.numberOfNewParsedTxs = object.numberOfNewParsedTxs;
    } else {
      message.numberOfNewParsedTxs = 0;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = 0;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = object.msg;
    } else {
      message.msg = '';
    }
    return message;
  },
  toJSON(message: ParseWalletResponse): unknown {
    const obj: any = {};
    obj.numberOfNewParsedTxs = message.numberOfNewParsedTxs || 0;
    obj.status = ParsingStatus.toJSON(message.status);
    obj.msg = message.msg || '';
    return obj;
  },
};

export const TxExtra = {
  encode(message: TxExtra, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.sTxHash);
    writer.uint32(18).string(message.rTimestamp);
    writer.uint32(26).string(message.sWalletAddress);
    writer.uint32(34).string(message.sContract);
    writer.uint32(42).string(message.sSender);
    writer.uint32(50).string(message.sRecipient);
    return writer;
  },
  decode(reader: Reader, length?: number): TxExtra {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseTxExtra) as TxExtra;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sTxHash = reader.string();
          break;
        case 2:
          message.rTimestamp = reader.string();
          break;
        case 3:
          message.sWalletAddress = reader.string();
          break;
        case 4:
          message.sContract = reader.string();
          break;
        case 5:
          message.sSender = reader.string();
          break;
        case 6:
          message.sRecipient = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TxExtra {
    const message = Object.create(baseTxExtra) as TxExtra;
    if (object.sTxHash !== undefined && object.sTxHash !== null) {
      message.sTxHash = String(object.sTxHash);
    } else {
      message.sTxHash = '';
    }
    if (object.rTimestamp !== undefined && object.rTimestamp !== null) {
      message.rTimestamp = String(object.rTimestamp);
    } else {
      message.rTimestamp = '';
    }
    if (object.sWalletAddress !== undefined && object.sWalletAddress !== null) {
      message.sWalletAddress = String(object.sWalletAddress);
    } else {
      message.sWalletAddress = '';
    }
    if (object.sContract !== undefined && object.sContract !== null) {
      message.sContract = String(object.sContract);
    } else {
      message.sContract = '';
    }
    if (object.sSender !== undefined && object.sSender !== null) {
      message.sSender = String(object.sSender);
    } else {
      message.sSender = '';
    }
    if (object.sRecipient !== undefined && object.sRecipient !== null) {
      message.sRecipient = String(object.sRecipient);
    } else {
      message.sRecipient = '';
    }
    return message;
  },
  fromPartial(object: DeepPartial<TxExtra>): TxExtra {
    const message = Object.create(baseTxExtra) as TxExtra;
    if (object.sTxHash !== undefined && object.sTxHash !== null) {
      message.sTxHash = object.sTxHash;
    } else {
      message.sTxHash = '';
    }
    if (object.rTimestamp !== undefined && object.rTimestamp !== null) {
      message.rTimestamp = object.rTimestamp;
    } else {
      message.rTimestamp = '';
    }
    if (object.sWalletAddress !== undefined && object.sWalletAddress !== null) {
      message.sWalletAddress = object.sWalletAddress;
    } else {
      message.sWalletAddress = '';
    }
    if (object.sContract !== undefined && object.sContract !== null) {
      message.sContract = object.sContract;
    } else {
      message.sContract = '';
    }
    if (object.sSender !== undefined && object.sSender !== null) {
      message.sSender = object.sSender;
    } else {
      message.sSender = '';
    }
    if (object.sRecipient !== undefined && object.sRecipient !== null) {
      message.sRecipient = object.sRecipient;
    } else {
      message.sRecipient = '';
    }
    return message;
  },
  toJSON(message: TxExtra): unknown {
    const obj: any = {};
    obj.sTxHash = message.sTxHash || '';
    obj.rTimestamp = message.rTimestamp || '';
    obj.sWalletAddress = message.sWalletAddress || '';
    obj.sContract = message.sContract || '';
    obj.sSender = message.sSender || '';
    obj.sRecipient = message.sRecipient || '';
    return obj;
  },
};

export const Tx = {
  encode(message: Tx, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.id);
    writer.uint32(18).string(message.txhash);
    writer.uint32(26).string(message.blockHeight);
    writer.uint32(34).string(message.timestamp);
    writer.uint32(42).string(message.label);
    writer.uint32(50).string(message.tag);
    writer.uint32(58).string(message.walletAddress);
    writer.uint32(66).string(message.contract);
    writer.uint32(74).string(message.sender);
    writer.uint32(82).string(message.recipient);
    writer.uint32(90).string(message.receivedAmount);
    writer.uint32(98).string(message.receivedToken);
    writer.uint32(106).string(message.sentAmount);
    writer.uint32(114).string(message.sentToken);
    writer.uint32(122).string(message.feeAmount);
    writer.uint32(130).string(message.feeToken);
    writer.uint32(138).string(message.taxAmount);
    writer.uint32(146).string(message.taxToken);
    writer.uint32(154).string(message.netWorthAmount);
    writer.uint32(162).string(message.netWorthToken);
    writer.uint32(170).string(message.memo);
    writer.uint32(178).string(message.friendlyDescription);
    writer.uint32(186).string(message.createdAt);
    writer.uint32(194).string(message.updatedAt);
    return writer;
  },
  decode(reader: Reader, length?: number): Tx {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseTx) as Tx;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.txhash = reader.string();
          break;
        case 3:
          message.blockHeight = reader.string();
          break;
        case 4:
          message.timestamp = reader.string();
          break;
        case 5:
          message.label = reader.string();
          break;
        case 6:
          message.tag = reader.string();
          break;
        case 7:
          message.walletAddress = reader.string();
          break;
        case 8:
          message.contract = reader.string();
          break;
        case 9:
          message.sender = reader.string();
          break;
        case 10:
          message.recipient = reader.string();
          break;
        case 11:
          message.receivedAmount = reader.string();
          break;
        case 12:
          message.receivedToken = reader.string();
          break;
        case 13:
          message.sentAmount = reader.string();
          break;
        case 14:
          message.sentToken = reader.string();
          break;
        case 15:
          message.feeAmount = reader.string();
          break;
        case 16:
          message.feeToken = reader.string();
          break;
        case 17:
          message.taxAmount = reader.string();
          break;
        case 18:
          message.taxToken = reader.string();
          break;
        case 19:
          message.netWorthAmount = reader.string();
          break;
        case 20:
          message.netWorthToken = reader.string();
          break;
        case 21:
          message.memo = reader.string();
          break;
        case 22:
          message.friendlyDescription = reader.string();
          break;
        case 23:
          message.createdAt = reader.string();
          break;
        case 24:
          message.updatedAt = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Tx {
    const message = Object.create(baseTx) as Tx;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = '';
    }
    if (object.txhash !== undefined && object.txhash !== null) {
      message.txhash = String(object.txhash);
    } else {
      message.txhash = '';
    }
    if (object.blockHeight !== undefined && object.blockHeight !== null) {
      message.blockHeight = String(object.blockHeight);
    } else {
      message.blockHeight = '';
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = String(object.timestamp);
    } else {
      message.timestamp = '';
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = String(object.label);
    } else {
      message.label = '';
    }
    if (object.tag !== undefined && object.tag !== null) {
      message.tag = String(object.tag);
    } else {
      message.tag = '';
    }
    if (object.walletAddress !== undefined && object.walletAddress !== null) {
      message.walletAddress = String(object.walletAddress);
    } else {
      message.walletAddress = '';
    }
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = String(object.contract);
    } else {
      message.contract = '';
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender);
    } else {
      message.sender = '';
    }
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = String(object.recipient);
    } else {
      message.recipient = '';
    }
    if (object.receivedAmount !== undefined && object.receivedAmount !== null) {
      message.receivedAmount = String(object.receivedAmount);
    } else {
      message.receivedAmount = '';
    }
    if (object.receivedToken !== undefined && object.receivedToken !== null) {
      message.receivedToken = String(object.receivedToken);
    } else {
      message.receivedToken = '';
    }
    if (object.sentAmount !== undefined && object.sentAmount !== null) {
      message.sentAmount = String(object.sentAmount);
    } else {
      message.sentAmount = '';
    }
    if (object.sentToken !== undefined && object.sentToken !== null) {
      message.sentToken = String(object.sentToken);
    } else {
      message.sentToken = '';
    }
    if (object.feeAmount !== undefined && object.feeAmount !== null) {
      message.feeAmount = String(object.feeAmount);
    } else {
      message.feeAmount = '';
    }
    if (object.feeToken !== undefined && object.feeToken !== null) {
      message.feeToken = String(object.feeToken);
    } else {
      message.feeToken = '';
    }
    if (object.taxAmount !== undefined && object.taxAmount !== null) {
      message.taxAmount = String(object.taxAmount);
    } else {
      message.taxAmount = '';
    }
    if (object.taxToken !== undefined && object.taxToken !== null) {
      message.taxToken = String(object.taxToken);
    } else {
      message.taxToken = '';
    }
    if (object.netWorthAmount !== undefined && object.netWorthAmount !== null) {
      message.netWorthAmount = String(object.netWorthAmount);
    } else {
      message.netWorthAmount = '';
    }
    if (object.netWorthToken !== undefined && object.netWorthToken !== null) {
      message.netWorthToken = String(object.netWorthToken);
    } else {
      message.netWorthToken = '';
    }
    if (object.memo !== undefined && object.memo !== null) {
      message.memo = String(object.memo);
    } else {
      message.memo = '';
    }
    if (object.friendlyDescription !== undefined && object.friendlyDescription !== null) {
      message.friendlyDescription = String(object.friendlyDescription);
    } else {
      message.friendlyDescription = '';
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = String(object.createdAt);
    } else {
      message.createdAt = '';
    }
    if (object.updatedAt !== undefined && object.updatedAt !== null) {
      message.updatedAt = String(object.updatedAt);
    } else {
      message.updatedAt = '';
    }
    return message;
  },
  fromPartial(object: DeepPartial<Tx>): Tx {
    const message = Object.create(baseTx) as Tx;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = '';
    }
    if (object.txhash !== undefined && object.txhash !== null) {
      message.txhash = object.txhash;
    } else {
      message.txhash = '';
    }
    if (object.blockHeight !== undefined && object.blockHeight !== null) {
      message.blockHeight = object.blockHeight;
    } else {
      message.blockHeight = '';
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = object.timestamp;
    } else {
      message.timestamp = '';
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = object.label;
    } else {
      message.label = '';
    }
    if (object.tag !== undefined && object.tag !== null) {
      message.tag = object.tag;
    } else {
      message.tag = '';
    }
    if (object.walletAddress !== undefined && object.walletAddress !== null) {
      message.walletAddress = object.walletAddress;
    } else {
      message.walletAddress = '';
    }
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = object.contract;
    } else {
      message.contract = '';
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    } else {
      message.sender = '';
    }
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = object.recipient;
    } else {
      message.recipient = '';
    }
    if (object.receivedAmount !== undefined && object.receivedAmount !== null) {
      message.receivedAmount = object.receivedAmount;
    } else {
      message.receivedAmount = '';
    }
    if (object.receivedToken !== undefined && object.receivedToken !== null) {
      message.receivedToken = object.receivedToken;
    } else {
      message.receivedToken = '';
    }
    if (object.sentAmount !== undefined && object.sentAmount !== null) {
      message.sentAmount = object.sentAmount;
    } else {
      message.sentAmount = '';
    }
    if (object.sentToken !== undefined && object.sentToken !== null) {
      message.sentToken = object.sentToken;
    } else {
      message.sentToken = '';
    }
    if (object.feeAmount !== undefined && object.feeAmount !== null) {
      message.feeAmount = object.feeAmount;
    } else {
      message.feeAmount = '';
    }
    if (object.feeToken !== undefined && object.feeToken !== null) {
      message.feeToken = object.feeToken;
    } else {
      message.feeToken = '';
    }
    if (object.taxAmount !== undefined && object.taxAmount !== null) {
      message.taxAmount = object.taxAmount;
    } else {
      message.taxAmount = '';
    }
    if (object.taxToken !== undefined && object.taxToken !== null) {
      message.taxToken = object.taxToken;
    } else {
      message.taxToken = '';
    }
    if (object.netWorthAmount !== undefined && object.netWorthAmount !== null) {
      message.netWorthAmount = object.netWorthAmount;
    } else {
      message.netWorthAmount = '';
    }
    if (object.netWorthToken !== undefined && object.netWorthToken !== null) {
      message.netWorthToken = object.netWorthToken;
    } else {
      message.netWorthToken = '';
    }
    if (object.memo !== undefined && object.memo !== null) {
      message.memo = object.memo;
    } else {
      message.memo = '';
    }
    if (object.friendlyDescription !== undefined && object.friendlyDescription !== null) {
      message.friendlyDescription = object.friendlyDescription;
    } else {
      message.friendlyDescription = '';
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = object.createdAt;
    } else {
      message.createdAt = '';
    }
    if (object.updatedAt !== undefined && object.updatedAt !== null) {
      message.updatedAt = object.updatedAt;
    } else {
      message.updatedAt = '';
    }
    return message;
  },
  toJSON(message: Tx): unknown {
    const obj: any = {};
    obj.id = message.id || '';
    obj.txhash = message.txhash || '';
    obj.blockHeight = message.blockHeight || '';
    obj.timestamp = message.timestamp || '';
    obj.label = message.label || '';
    obj.tag = message.tag || '';
    obj.walletAddress = message.walletAddress || '';
    obj.contract = message.contract || '';
    obj.sender = message.sender || '';
    obj.recipient = message.recipient || '';
    obj.receivedAmount = message.receivedAmount || '';
    obj.receivedToken = message.receivedToken || '';
    obj.sentAmount = message.sentAmount || '';
    obj.sentToken = message.sentToken || '';
    obj.feeAmount = message.feeAmount || '';
    obj.feeToken = message.feeToken || '';
    obj.taxAmount = message.taxAmount || '';
    obj.taxToken = message.taxToken || '';
    obj.netWorthAmount = message.netWorthAmount || '';
    obj.netWorthToken = message.netWorthToken || '';
    obj.memo = message.memo || '';
    obj.friendlyDescription = message.friendlyDescription || '';
    obj.createdAt = message.createdAt || '';
    obj.updatedAt = message.updatedAt || '';
    return obj;
  },
};

export const TxCointracker = {
  encode(message: TxCointracker, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.id);
    writer.uint32(18).string(message.timestamp);
    writer.uint32(26).string(message.receivedAmount);
    writer.uint32(34).string(message.receivedToken);
    writer.uint32(42).string(message.sentAmount);
    writer.uint32(50).string(message.sentToken);
    writer.uint32(58).string(message.feeAmount);
    writer.uint32(66).string(message.feeToken);
    writer.uint32(74).string(message.label);
    writer.uint32(82).string(message.tag);
    return writer;
  },
  decode(reader: Reader, length?: number): TxCointracker {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseTxCointracker) as TxCointracker;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.timestamp = reader.string();
          break;
        case 3:
          message.receivedAmount = reader.string();
          break;
        case 4:
          message.receivedToken = reader.string();
          break;
        case 5:
          message.sentAmount = reader.string();
          break;
        case 6:
          message.sentToken = reader.string();
          break;
        case 7:
          message.feeAmount = reader.string();
          break;
        case 8:
          message.feeToken = reader.string();
          break;
        case 9:
          message.label = reader.string();
          break;
        case 10:
          message.tag = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TxCointracker {
    const message = Object.create(baseTxCointracker) as TxCointracker;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = '';
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = String(object.timestamp);
    } else {
      message.timestamp = '';
    }
    if (object.receivedAmount !== undefined && object.receivedAmount !== null) {
      message.receivedAmount = String(object.receivedAmount);
    } else {
      message.receivedAmount = '';
    }
    if (object.receivedToken !== undefined && object.receivedToken !== null) {
      message.receivedToken = String(object.receivedToken);
    } else {
      message.receivedToken = '';
    }
    if (object.sentAmount !== undefined && object.sentAmount !== null) {
      message.sentAmount = String(object.sentAmount);
    } else {
      message.sentAmount = '';
    }
    if (object.sentToken !== undefined && object.sentToken !== null) {
      message.sentToken = String(object.sentToken);
    } else {
      message.sentToken = '';
    }
    if (object.feeAmount !== undefined && object.feeAmount !== null) {
      message.feeAmount = String(object.feeAmount);
    } else {
      message.feeAmount = '';
    }
    if (object.feeToken !== undefined && object.feeToken !== null) {
      message.feeToken = String(object.feeToken);
    } else {
      message.feeToken = '';
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = String(object.label);
    } else {
      message.label = '';
    }
    if (object.tag !== undefined && object.tag !== null) {
      message.tag = String(object.tag);
    } else {
      message.tag = '';
    }
    return message;
  },
  fromPartial(object: DeepPartial<TxCointracker>): TxCointracker {
    const message = Object.create(baseTxCointracker) as TxCointracker;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = '';
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = object.timestamp;
    } else {
      message.timestamp = '';
    }
    if (object.receivedAmount !== undefined && object.receivedAmount !== null) {
      message.receivedAmount = object.receivedAmount;
    } else {
      message.receivedAmount = '';
    }
    if (object.receivedToken !== undefined && object.receivedToken !== null) {
      message.receivedToken = object.receivedToken;
    } else {
      message.receivedToken = '';
    }
    if (object.sentAmount !== undefined && object.sentAmount !== null) {
      message.sentAmount = object.sentAmount;
    } else {
      message.sentAmount = '';
    }
    if (object.sentToken !== undefined && object.sentToken !== null) {
      message.sentToken = object.sentToken;
    } else {
      message.sentToken = '';
    }
    if (object.feeAmount !== undefined && object.feeAmount !== null) {
      message.feeAmount = object.feeAmount;
    } else {
      message.feeAmount = '';
    }
    if (object.feeToken !== undefined && object.feeToken !== null) {
      message.feeToken = object.feeToken;
    } else {
      message.feeToken = '';
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = object.label;
    } else {
      message.label = '';
    }
    if (object.tag !== undefined && object.tag !== null) {
      message.tag = object.tag;
    } else {
      message.tag = '';
    }
    return message;
  },
  toJSON(message: TxCointracker): unknown {
    const obj: any = {};
    obj.id = message.id || '';
    obj.timestamp = message.timestamp || '';
    obj.receivedAmount = message.receivedAmount || '';
    obj.receivedToken = message.receivedToken || '';
    obj.sentAmount = message.sentAmount || '';
    obj.sentToken = message.sentToken || '';
    obj.feeAmount = message.feeAmount || '';
    obj.feeToken = message.feeToken || '';
    obj.label = message.label || '';
    obj.tag = message.tag || '';
    return obj;
  },
};

export const TxKoinly = {
  encode(message: TxKoinly, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.id);
    writer.uint32(18).string(message.txhash);
    writer.uint32(26).string(message.timestamp);
    writer.uint32(34).string(message.label);
    writer.uint32(42).string(message.tag);
    writer.uint32(50).string(message.receivedAmount);
    writer.uint32(58).string(message.receivedToken);
    writer.uint32(66).string(message.sentAmount);
    writer.uint32(74).string(message.sentToken);
    writer.uint32(82).string(message.feeAmount);
    writer.uint32(90).string(message.feeToken);
    writer.uint32(98).string(message.netWorthAmount);
    writer.uint32(106).string(message.netWorthToken);
    writer.uint32(114).string(message.friendlyDescription);
    return writer;
  },
  decode(reader: Reader, length?: number): TxKoinly {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseTxKoinly) as TxKoinly;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.txhash = reader.string();
          break;
        case 3:
          message.timestamp = reader.string();
          break;
        case 4:
          message.label = reader.string();
          break;
        case 5:
          message.tag = reader.string();
          break;
        case 6:
          message.receivedAmount = reader.string();
          break;
        case 7:
          message.receivedToken = reader.string();
          break;
        case 8:
          message.sentAmount = reader.string();
          break;
        case 9:
          message.sentToken = reader.string();
          break;
        case 10:
          message.feeAmount = reader.string();
          break;
        case 11:
          message.feeToken = reader.string();
          break;
        case 12:
          message.netWorthAmount = reader.string();
          break;
        case 13:
          message.netWorthToken = reader.string();
          break;
        case 14:
          message.friendlyDescription = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TxKoinly {
    const message = Object.create(baseTxKoinly) as TxKoinly;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = '';
    }
    if (object.txhash !== undefined && object.txhash !== null) {
      message.txhash = String(object.txhash);
    } else {
      message.txhash = '';
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = String(object.timestamp);
    } else {
      message.timestamp = '';
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = String(object.label);
    } else {
      message.label = '';
    }
    if (object.tag !== undefined && object.tag !== null) {
      message.tag = String(object.tag);
    } else {
      message.tag = '';
    }
    if (object.receivedAmount !== undefined && object.receivedAmount !== null) {
      message.receivedAmount = String(object.receivedAmount);
    } else {
      message.receivedAmount = '';
    }
    if (object.receivedToken !== undefined && object.receivedToken !== null) {
      message.receivedToken = String(object.receivedToken);
    } else {
      message.receivedToken = '';
    }
    if (object.sentAmount !== undefined && object.sentAmount !== null) {
      message.sentAmount = String(object.sentAmount);
    } else {
      message.sentAmount = '';
    }
    if (object.sentToken !== undefined && object.sentToken !== null) {
      message.sentToken = String(object.sentToken);
    } else {
      message.sentToken = '';
    }
    if (object.feeAmount !== undefined && object.feeAmount !== null) {
      message.feeAmount = String(object.feeAmount);
    } else {
      message.feeAmount = '';
    }
    if (object.feeToken !== undefined && object.feeToken !== null) {
      message.feeToken = String(object.feeToken);
    } else {
      message.feeToken = '';
    }
    if (object.netWorthAmount !== undefined && object.netWorthAmount !== null) {
      message.netWorthAmount = String(object.netWorthAmount);
    } else {
      message.netWorthAmount = '';
    }
    if (object.netWorthToken !== undefined && object.netWorthToken !== null) {
      message.netWorthToken = String(object.netWorthToken);
    } else {
      message.netWorthToken = '';
    }
    if (object.friendlyDescription !== undefined && object.friendlyDescription !== null) {
      message.friendlyDescription = String(object.friendlyDescription);
    } else {
      message.friendlyDescription = '';
    }
    return message;
  },
  fromPartial(object: DeepPartial<TxKoinly>): TxKoinly {
    const message = Object.create(baseTxKoinly) as TxKoinly;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = '';
    }
    if (object.txhash !== undefined && object.txhash !== null) {
      message.txhash = object.txhash;
    } else {
      message.txhash = '';
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = object.timestamp;
    } else {
      message.timestamp = '';
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = object.label;
    } else {
      message.label = '';
    }
    if (object.tag !== undefined && object.tag !== null) {
      message.tag = object.tag;
    } else {
      message.tag = '';
    }
    if (object.receivedAmount !== undefined && object.receivedAmount !== null) {
      message.receivedAmount = object.receivedAmount;
    } else {
      message.receivedAmount = '';
    }
    if (object.receivedToken !== undefined && object.receivedToken !== null) {
      message.receivedToken = object.receivedToken;
    } else {
      message.receivedToken = '';
    }
    if (object.sentAmount !== undefined && object.sentAmount !== null) {
      message.sentAmount = object.sentAmount;
    } else {
      message.sentAmount = '';
    }
    if (object.sentToken !== undefined && object.sentToken !== null) {
      message.sentToken = object.sentToken;
    } else {
      message.sentToken = '';
    }
    if (object.feeAmount !== undefined && object.feeAmount !== null) {
      message.feeAmount = object.feeAmount;
    } else {
      message.feeAmount = '';
    }
    if (object.feeToken !== undefined && object.feeToken !== null) {
      message.feeToken = object.feeToken;
    } else {
      message.feeToken = '';
    }
    if (object.netWorthAmount !== undefined && object.netWorthAmount !== null) {
      message.netWorthAmount = object.netWorthAmount;
    } else {
      message.netWorthAmount = '';
    }
    if (object.netWorthToken !== undefined && object.netWorthToken !== null) {
      message.netWorthToken = object.netWorthToken;
    } else {
      message.netWorthToken = '';
    }
    if (object.friendlyDescription !== undefined && object.friendlyDescription !== null) {
      message.friendlyDescription = object.friendlyDescription;
    } else {
      message.friendlyDescription = '';
    }
    return message;
  },
  toJSON(message: TxKoinly): unknown {
    const obj: any = {};
    obj.id = message.id || '';
    obj.txhash = message.txhash || '';
    obj.timestamp = message.timestamp || '';
    obj.label = message.label || '';
    obj.tag = message.tag || '';
    obj.receivedAmount = message.receivedAmount || '';
    obj.receivedToken = message.receivedToken || '';
    obj.sentAmount = message.sentAmount || '';
    obj.sentToken = message.sentToken || '';
    obj.feeAmount = message.feeAmount || '';
    obj.feeToken = message.feeToken || '';
    obj.netWorthAmount = message.netWorthAmount || '';
    obj.netWorthToken = message.netWorthToken || '';
    obj.friendlyDescription = message.friendlyDescription || '';
    return obj;
  },
};

export const TxNode = {
  encode(message: TxNode, writer: Writer = Writer.create()): Writer {
    if (message.tx !== undefined && message.tx !== undefined) {
      Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
    }
    if (message.extras !== undefined && message.extras !== undefined) {
      TxExtra.encode(message.extras, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): TxNode {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseTxNode) as TxNode;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx = Tx.decode(reader, reader.uint32());
          break;
        case 2:
          message.extras = TxExtra.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TxNode {
    const message = Object.create(baseTxNode) as TxNode;
    if (object.tx !== undefined && object.tx !== null) {
      message.tx = Tx.fromJSON(object.tx);
    } else {
      message.tx = undefined;
    }
    if (object.extras !== undefined && object.extras !== null) {
      message.extras = TxExtra.fromJSON(object.extras);
    } else {
      message.extras = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<TxNode>): TxNode {
    const message = Object.create(baseTxNode) as TxNode;
    if (object.tx !== undefined && object.tx !== null) {
      message.tx = Tx.fromPartial(object.tx);
    } else {
      message.tx = undefined;
    }
    if (object.extras !== undefined && object.extras !== null) {
      message.extras = TxExtra.fromPartial(object.extras);
    } else {
      message.extras = undefined;
    }
    return message;
  },
  toJSON(message: TxNode): unknown {
    const obj: any = {};
    obj.tx = message.tx ? Tx.toJSON(message.tx) : undefined;
    obj.extras = message.extras ? TxExtra.toJSON(message.extras) : undefined;
    return obj;
  },
};

export const TxKoinlyNode = {
  encode(message: TxKoinlyNode, writer: Writer = Writer.create()): Writer {
    if (message.tx !== undefined && message.tx !== undefined) {
      TxKoinly.encode(message.tx, writer.uint32(10).fork()).ldelim();
    }
    if (message.extras !== undefined && message.extras !== undefined) {
      TxExtra.encode(message.extras, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): TxKoinlyNode {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseTxKoinlyNode) as TxKoinlyNode;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx = TxKoinly.decode(reader, reader.uint32());
          break;
        case 2:
          message.extras = TxExtra.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TxKoinlyNode {
    const message = Object.create(baseTxKoinlyNode) as TxKoinlyNode;
    if (object.tx !== undefined && object.tx !== null) {
      message.tx = TxKoinly.fromJSON(object.tx);
    } else {
      message.tx = undefined;
    }
    if (object.extras !== undefined && object.extras !== null) {
      message.extras = TxExtra.fromJSON(object.extras);
    } else {
      message.extras = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<TxKoinlyNode>): TxKoinlyNode {
    const message = Object.create(baseTxKoinlyNode) as TxKoinlyNode;
    if (object.tx !== undefined && object.tx !== null) {
      message.tx = TxKoinly.fromPartial(object.tx);
    } else {
      message.tx = undefined;
    }
    if (object.extras !== undefined && object.extras !== null) {
      message.extras = TxExtra.fromPartial(object.extras);
    } else {
      message.extras = undefined;
    }
    return message;
  },
  toJSON(message: TxKoinlyNode): unknown {
    const obj: any = {};
    obj.tx = message.tx ? TxKoinly.toJSON(message.tx) : undefined;
    obj.extras = message.extras ? TxExtra.toJSON(message.extras) : undefined;
    return obj;
  },
};

export const TxCointrackerNode = {
  encode(message: TxCointrackerNode, writer: Writer = Writer.create()): Writer {
    if (message.tx !== undefined && message.tx !== undefined) {
      TxCointracker.encode(message.tx, writer.uint32(10).fork()).ldelim();
    }
    if (message.extras !== undefined && message.extras !== undefined) {
      TxExtra.encode(message.extras, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): TxCointrackerNode {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseTxCointrackerNode) as TxCointrackerNode;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx = TxCointracker.decode(reader, reader.uint32());
          break;
        case 2:
          message.extras = TxExtra.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TxCointrackerNode {
    const message = Object.create(baseTxCointrackerNode) as TxCointrackerNode;
    if (object.tx !== undefined && object.tx !== null) {
      message.tx = TxCointracker.fromJSON(object.tx);
    } else {
      message.tx = undefined;
    }
    if (object.extras !== undefined && object.extras !== null) {
      message.extras = TxExtra.fromJSON(object.extras);
    } else {
      message.extras = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<TxCointrackerNode>): TxCointrackerNode {
    const message = Object.create(baseTxCointrackerNode) as TxCointrackerNode;
    if (object.tx !== undefined && object.tx !== null) {
      message.tx = TxCointracker.fromPartial(object.tx);
    } else {
      message.tx = undefined;
    }
    if (object.extras !== undefined && object.extras !== null) {
      message.extras = TxExtra.fromPartial(object.extras);
    } else {
      message.extras = undefined;
    }
    return message;
  },
  toJSON(message: TxCointrackerNode): unknown {
    const obj: any = {};
    obj.tx = message.tx ? TxCointracker.toJSON(message.tx) : undefined;
    obj.extras = message.extras ? TxExtra.toJSON(message.extras) : undefined;
    return obj;
  },
};

export const TxEdge = {
  encode(message: TxEdge, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.cursor);
    if (message.node !== undefined && message.node !== undefined) {
      TxNode.encode(message.node, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): TxEdge {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseTxEdge) as TxEdge;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cursor = reader.string();
          break;
        case 2:
          message.node = TxNode.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TxEdge {
    const message = Object.create(baseTxEdge) as TxEdge;
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = String(object.cursor);
    } else {
      message.cursor = '';
    }
    if (object.node !== undefined && object.node !== null) {
      message.node = TxNode.fromJSON(object.node);
    } else {
      message.node = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<TxEdge>): TxEdge {
    const message = Object.create(baseTxEdge) as TxEdge;
    if (object.cursor !== undefined && object.cursor !== null) {
      message.cursor = object.cursor;
    } else {
      message.cursor = '';
    }
    if (object.node !== undefined && object.node !== null) {
      message.node = TxNode.fromPartial(object.node);
    } else {
      message.node = undefined;
    }
    return message;
  },
  toJSON(message: TxEdge): unknown {
    const obj: any = {};
    obj.cursor = message.cursor || '';
    obj.node = message.node ? TxNode.toJSON(message.node) : undefined;
    return obj;
  },
};

export const PageInfo = {
  encode(message: PageInfo, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.pageInfo);
    writer.uint32(18).string(message.hasNextPage);
    writer.uint32(26).string(message.hasPreviousPage);
    writer.uint32(34).string(message.endCursor);
    writer.uint32(42).string(message.startCursor);
    return writer;
  },
  decode(reader: Reader, length?: number): PageInfo {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(basePageInfo) as PageInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pageInfo = reader.string();
          break;
        case 2:
          message.hasNextPage = reader.string();
          break;
        case 3:
          message.hasPreviousPage = reader.string();
          break;
        case 4:
          message.endCursor = reader.string();
          break;
        case 5:
          message.startCursor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PageInfo {
    const message = Object.create(basePageInfo) as PageInfo;
    if (object.pageInfo !== undefined && object.pageInfo !== null) {
      message.pageInfo = String(object.pageInfo);
    } else {
      message.pageInfo = '';
    }
    if (object.hasNextPage !== undefined && object.hasNextPage !== null) {
      message.hasNextPage = String(object.hasNextPage);
    } else {
      message.hasNextPage = '';
    }
    if (object.hasPreviousPage !== undefined && object.hasPreviousPage !== null) {
      message.hasPreviousPage = String(object.hasPreviousPage);
    } else {
      message.hasPreviousPage = '';
    }
    if (object.endCursor !== undefined && object.endCursor !== null) {
      message.endCursor = String(object.endCursor);
    } else {
      message.endCursor = '';
    }
    if (object.startCursor !== undefined && object.startCursor !== null) {
      message.startCursor = String(object.startCursor);
    } else {
      message.startCursor = '';
    }
    return message;
  },
  fromPartial(object: DeepPartial<PageInfo>): PageInfo {
    const message = Object.create(basePageInfo) as PageInfo;
    if (object.pageInfo !== undefined && object.pageInfo !== null) {
      message.pageInfo = object.pageInfo;
    } else {
      message.pageInfo = '';
    }
    if (object.hasNextPage !== undefined && object.hasNextPage !== null) {
      message.hasNextPage = object.hasNextPage;
    } else {
      message.hasNextPage = '';
    }
    if (object.hasPreviousPage !== undefined && object.hasPreviousPage !== null) {
      message.hasPreviousPage = object.hasPreviousPage;
    } else {
      message.hasPreviousPage = '';
    }
    if (object.endCursor !== undefined && object.endCursor !== null) {
      message.endCursor = object.endCursor;
    } else {
      message.endCursor = '';
    }
    if (object.startCursor !== undefined && object.startCursor !== null) {
      message.startCursor = object.startCursor;
    } else {
      message.startCursor = '';
    }
    return message;
  },
  toJSON(message: PageInfo): unknown {
    const obj: any = {};
    obj.pageInfo = message.pageInfo || '';
    obj.hasNextPage = message.hasNextPage || '';
    obj.hasPreviousPage = message.hasPreviousPage || '';
    obj.endCursor = message.endCursor || '';
    obj.startCursor = message.startCursor || '';
    return obj;
  },
};

export const CreateTxRequest = {
  encode(message: CreateTxRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.txhash);
    writer.uint32(18).string(message.blockHeight);
    writer.uint32(26).string(message.timestamp);
    writer.uint32(34).string(message.label);
    writer.uint32(42).string(message.tag);
    writer.uint32(50).string(message.walletAddress);
    writer.uint32(58).string(message.contract);
    writer.uint32(66).string(message.sender);
    writer.uint32(74).string(message.recipient);
    writer.uint32(82).string(message.receivedAmount);
    writer.uint32(90).string(message.receivedToken);
    writer.uint32(98).string(message.sentAmount);
    writer.uint32(106).string(message.sentToken);
    writer.uint32(114).string(message.feeAmount);
    writer.uint32(122).string(message.feeToken);
    writer.uint32(130).string(message.taxAmount);
    writer.uint32(138).string(message.taxToken);
    writer.uint32(146).string(message.netWorthAmount);
    writer.uint32(154).string(message.netWorthToken);
    writer.uint32(162).string(message.memo);
    writer.uint32(170).string(message.friendlyDescription);
    return writer;
  },
  decode(reader: Reader, length?: number): CreateTxRequest {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateTxRequest) as CreateTxRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txhash = reader.string();
          break;
        case 2:
          message.blockHeight = reader.string();
          break;
        case 3:
          message.timestamp = reader.string();
          break;
        case 4:
          message.label = reader.string();
          break;
        case 5:
          message.tag = reader.string();
          break;
        case 6:
          message.walletAddress = reader.string();
          break;
        case 7:
          message.contract = reader.string();
          break;
        case 8:
          message.sender = reader.string();
          break;
        case 9:
          message.recipient = reader.string();
          break;
        case 10:
          message.receivedAmount = reader.string();
          break;
        case 11:
          message.receivedToken = reader.string();
          break;
        case 12:
          message.sentAmount = reader.string();
          break;
        case 13:
          message.sentToken = reader.string();
          break;
        case 14:
          message.feeAmount = reader.string();
          break;
        case 15:
          message.feeToken = reader.string();
          break;
        case 16:
          message.taxAmount = reader.string();
          break;
        case 17:
          message.taxToken = reader.string();
          break;
        case 18:
          message.netWorthAmount = reader.string();
          break;
        case 19:
          message.netWorthToken = reader.string();
          break;
        case 20:
          message.memo = reader.string();
          break;
        case 21:
          message.friendlyDescription = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CreateTxRequest {
    const message = Object.create(baseCreateTxRequest) as CreateTxRequest;
    if (object.txhash !== undefined && object.txhash !== null) {
      message.txhash = String(object.txhash);
    } else {
      message.txhash = '';
    }
    if (object.blockHeight !== undefined && object.blockHeight !== null) {
      message.blockHeight = String(object.blockHeight);
    } else {
      message.blockHeight = '';
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = String(object.timestamp);
    } else {
      message.timestamp = '';
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = String(object.label);
    } else {
      message.label = '';
    }
    if (object.tag !== undefined && object.tag !== null) {
      message.tag = String(object.tag);
    } else {
      message.tag = '';
    }
    if (object.walletAddress !== undefined && object.walletAddress !== null) {
      message.walletAddress = String(object.walletAddress);
    } else {
      message.walletAddress = '';
    }
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = String(object.contract);
    } else {
      message.contract = '';
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender);
    } else {
      message.sender = '';
    }
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = String(object.recipient);
    } else {
      message.recipient = '';
    }
    if (object.receivedAmount !== undefined && object.receivedAmount !== null) {
      message.receivedAmount = String(object.receivedAmount);
    } else {
      message.receivedAmount = '';
    }
    if (object.receivedToken !== undefined && object.receivedToken !== null) {
      message.receivedToken = String(object.receivedToken);
    } else {
      message.receivedToken = '';
    }
    if (object.sentAmount !== undefined && object.sentAmount !== null) {
      message.sentAmount = String(object.sentAmount);
    } else {
      message.sentAmount = '';
    }
    if (object.sentToken !== undefined && object.sentToken !== null) {
      message.sentToken = String(object.sentToken);
    } else {
      message.sentToken = '';
    }
    if (object.feeAmount !== undefined && object.feeAmount !== null) {
      message.feeAmount = String(object.feeAmount);
    } else {
      message.feeAmount = '';
    }
    if (object.feeToken !== undefined && object.feeToken !== null) {
      message.feeToken = String(object.feeToken);
    } else {
      message.feeToken = '';
    }
    if (object.taxAmount !== undefined && object.taxAmount !== null) {
      message.taxAmount = String(object.taxAmount);
    } else {
      message.taxAmount = '';
    }
    if (object.taxToken !== undefined && object.taxToken !== null) {
      message.taxToken = String(object.taxToken);
    } else {
      message.taxToken = '';
    }
    if (object.netWorthAmount !== undefined && object.netWorthAmount !== null) {
      message.netWorthAmount = String(object.netWorthAmount);
    } else {
      message.netWorthAmount = '';
    }
    if (object.netWorthToken !== undefined && object.netWorthToken !== null) {
      message.netWorthToken = String(object.netWorthToken);
    } else {
      message.netWorthToken = '';
    }
    if (object.memo !== undefined && object.memo !== null) {
      message.memo = String(object.memo);
    } else {
      message.memo = '';
    }
    if (object.friendlyDescription !== undefined && object.friendlyDescription !== null) {
      message.friendlyDescription = String(object.friendlyDescription);
    } else {
      message.friendlyDescription = '';
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreateTxRequest>): CreateTxRequest {
    const message = Object.create(baseCreateTxRequest) as CreateTxRequest;
    if (object.txhash !== undefined && object.txhash !== null) {
      message.txhash = object.txhash;
    } else {
      message.txhash = '';
    }
    if (object.blockHeight !== undefined && object.blockHeight !== null) {
      message.blockHeight = object.blockHeight;
    } else {
      message.blockHeight = '';
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = object.timestamp;
    } else {
      message.timestamp = '';
    }
    if (object.label !== undefined && object.label !== null) {
      message.label = object.label;
    } else {
      message.label = '';
    }
    if (object.tag !== undefined && object.tag !== null) {
      message.tag = object.tag;
    } else {
      message.tag = '';
    }
    if (object.walletAddress !== undefined && object.walletAddress !== null) {
      message.walletAddress = object.walletAddress;
    } else {
      message.walletAddress = '';
    }
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = object.contract;
    } else {
      message.contract = '';
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    } else {
      message.sender = '';
    }
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = object.recipient;
    } else {
      message.recipient = '';
    }
    if (object.receivedAmount !== undefined && object.receivedAmount !== null) {
      message.receivedAmount = object.receivedAmount;
    } else {
      message.receivedAmount = '';
    }
    if (object.receivedToken !== undefined && object.receivedToken !== null) {
      message.receivedToken = object.receivedToken;
    } else {
      message.receivedToken = '';
    }
    if (object.sentAmount !== undefined && object.sentAmount !== null) {
      message.sentAmount = object.sentAmount;
    } else {
      message.sentAmount = '';
    }
    if (object.sentToken !== undefined && object.sentToken !== null) {
      message.sentToken = object.sentToken;
    } else {
      message.sentToken = '';
    }
    if (object.feeAmount !== undefined && object.feeAmount !== null) {
      message.feeAmount = object.feeAmount;
    } else {
      message.feeAmount = '';
    }
    if (object.feeToken !== undefined && object.feeToken !== null) {
      message.feeToken = object.feeToken;
    } else {
      message.feeToken = '';
    }
    if (object.taxAmount !== undefined && object.taxAmount !== null) {
      message.taxAmount = object.taxAmount;
    } else {
      message.taxAmount = '';
    }
    if (object.taxToken !== undefined && object.taxToken !== null) {
      message.taxToken = object.taxToken;
    } else {
      message.taxToken = '';
    }
    if (object.netWorthAmount !== undefined && object.netWorthAmount !== null) {
      message.netWorthAmount = object.netWorthAmount;
    } else {
      message.netWorthAmount = '';
    }
    if (object.netWorthToken !== undefined && object.netWorthToken !== null) {
      message.netWorthToken = object.netWorthToken;
    } else {
      message.netWorthToken = '';
    }
    if (object.memo !== undefined && object.memo !== null) {
      message.memo = object.memo;
    } else {
      message.memo = '';
    }
    if (object.friendlyDescription !== undefined && object.friendlyDescription !== null) {
      message.friendlyDescription = object.friendlyDescription;
    } else {
      message.friendlyDescription = '';
    }
    return message;
  },
  toJSON(message: CreateTxRequest): unknown {
    const obj: any = {};
    obj.txhash = message.txhash || '';
    obj.blockHeight = message.blockHeight || '';
    obj.timestamp = message.timestamp || '';
    obj.label = message.label || '';
    obj.tag = message.tag || '';
    obj.walletAddress = message.walletAddress || '';
    obj.contract = message.contract || '';
    obj.sender = message.sender || '';
    obj.recipient = message.recipient || '';
    obj.receivedAmount = message.receivedAmount || '';
    obj.receivedToken = message.receivedToken || '';
    obj.sentAmount = message.sentAmount || '';
    obj.sentToken = message.sentToken || '';
    obj.feeAmount = message.feeAmount || '';
    obj.feeToken = message.feeToken || '';
    obj.taxAmount = message.taxAmount || '';
    obj.taxToken = message.taxToken || '';
    obj.netWorthAmount = message.netWorthAmount || '';
    obj.netWorthToken = message.netWorthToken || '';
    obj.memo = message.memo || '';
    obj.friendlyDescription = message.friendlyDescription || '';
    return obj;
  },
};

export const CreateTxResponse = {
  encode(message: CreateTxResponse, writer: Writer = Writer.create()): Writer {
    if (message.tx !== undefined && message.tx !== undefined) {
      Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): CreateTxResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateTxResponse) as CreateTxResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx = Tx.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CreateTxResponse {
    const message = Object.create(baseCreateTxResponse) as CreateTxResponse;
    if (object.tx !== undefined && object.tx !== null) {
      message.tx = Tx.fromJSON(object.tx);
    } else {
      message.tx = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreateTxResponse>): CreateTxResponse {
    const message = Object.create(baseCreateTxResponse) as CreateTxResponse;
    if (object.tx !== undefined && object.tx !== null) {
      message.tx = Tx.fromPartial(object.tx);
    } else {
      message.tx = undefined;
    }
    return message;
  },
  toJSON(message: CreateTxResponse): unknown {
    const obj: any = {};
    obj.tx = message.tx ? Tx.toJSON(message.tx) : undefined;
    return obj;
  },
};

export const CreateTxsRequest = {
  encode(message: CreateTxsRequest, writer: Writer = Writer.create()): Writer {
    for (const v of message.txs) {
      CreateTxRequest.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): CreateTxsRequest {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateTxsRequest) as CreateTxsRequest;
    message.txs = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txs.push(CreateTxRequest.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CreateTxsRequest {
    const message = Object.create(baseCreateTxsRequest) as CreateTxsRequest;
    message.txs = [];
    if (object.txs !== undefined && object.txs !== null) {
      for (const e of object.txs) {
        message.txs.push(CreateTxRequest.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreateTxsRequest>): CreateTxsRequest {
    const message = Object.create(baseCreateTxsRequest) as CreateTxsRequest;
    message.txs = [];
    if (object.txs !== undefined && object.txs !== null) {
      for (const e of object.txs) {
        message.txs.push(CreateTxRequest.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: CreateTxsRequest): unknown {
    const obj: any = {};
    if (message.txs) {
      obj.txs = message.txs.map(e => e ? CreateTxRequest.toJSON(e) : undefined);
    } else {
      obj.txs = [];
    }
    return obj;
  },
};

export const CreateTxsResponse = {
  encode(message: CreateTxsResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(16).int32(message.status);
    return writer;
  },
  decode(reader: Reader, length?: number): CreateTxsResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCreateTxsResponse) as CreateTxsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CreateTxsResponse {
    const message = Object.create(baseCreateTxsResponse) as CreateTxsResponse;
    if (object.status !== undefined && object.status !== null) {
      message.status = ParsingStatus.fromJSON(object.status);
    } else {
      message.status = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CreateTxsResponse>): CreateTxsResponse {
    const message = Object.create(baseCreateTxsResponse) as CreateTxsResponse;
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = 0;
    }
    return message;
  },
  toJSON(message: CreateTxsResponse): unknown {
    const obj: any = {};
    obj.status = ParsingStatus.toJSON(message.status);
    return obj;
  },
};

export const DeleteTxRequest = {
  encode(message: DeleteTxRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.id);
    return writer;
  },
  decode(reader: Reader, length?: number): DeleteTxRequest {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseDeleteTxRequest) as DeleteTxRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DeleteTxRequest {
    const message = Object.create(baseDeleteTxRequest) as DeleteTxRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = '';
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeleteTxRequest>): DeleteTxRequest {
    const message = Object.create(baseDeleteTxRequest) as DeleteTxRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = '';
    }
    return message;
  },
  toJSON(message: DeleteTxRequest): unknown {
    const obj: any = {};
    obj.id = message.id || '';
    return obj;
  },
};

export const DeleteTxResponse = {
  encode(message: DeleteTxResponse, writer: Writer = Writer.create()): Writer {
    if (message.tx !== undefined && message.tx !== undefined) {
      Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): DeleteTxResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseDeleteTxResponse) as DeleteTxResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx = Tx.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DeleteTxResponse {
    const message = Object.create(baseDeleteTxResponse) as DeleteTxResponse;
    if (object.tx !== undefined && object.tx !== null) {
      message.tx = Tx.fromJSON(object.tx);
    } else {
      message.tx = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeleteTxResponse>): DeleteTxResponse {
    const message = Object.create(baseDeleteTxResponse) as DeleteTxResponse;
    if (object.tx !== undefined && object.tx !== null) {
      message.tx = Tx.fromPartial(object.tx);
    } else {
      message.tx = undefined;
    }
    return message;
  },
  toJSON(message: DeleteTxResponse): unknown {
    const obj: any = {};
    obj.tx = message.tx ? Tx.toJSON(message.tx) : undefined;
    return obj;
  },
};

export const ReadTxRequest = {
  encode(message: ReadTxRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.filter);
    return writer;
  },
  decode(reader: Reader, length?: number): ReadTxRequest {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseReadTxRequest) as ReadTxRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.filter = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ReadTxRequest {
    const message = Object.create(baseReadTxRequest) as ReadTxRequest;
    if (object.filter !== undefined && object.filter !== null) {
      message.filter = String(object.filter);
    } else {
      message.filter = '';
    }
    return message;
  },
  fromPartial(object: DeepPartial<ReadTxRequest>): ReadTxRequest {
    const message = Object.create(baseReadTxRequest) as ReadTxRequest;
    if (object.filter !== undefined && object.filter !== null) {
      message.filter = object.filter;
    } else {
      message.filter = '';
    }
    return message;
  },
  toJSON(message: ReadTxRequest): unknown {
    const obj: any = {};
    obj.filter = message.filter || '';
    return obj;
  },
};

export const ReadTxResponse = {
  encode(message: ReadTxResponse, writer: Writer = Writer.create()): Writer {
    if (message.tx !== undefined && message.tx !== undefined) {
      Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): ReadTxResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseReadTxResponse) as ReadTxResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx = Tx.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ReadTxResponse {
    const message = Object.create(baseReadTxResponse) as ReadTxResponse;
    if (object.tx !== undefined && object.tx !== null) {
      message.tx = Tx.fromJSON(object.tx);
    } else {
      message.tx = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ReadTxResponse>): ReadTxResponse {
    const message = Object.create(baseReadTxResponse) as ReadTxResponse;
    if (object.tx !== undefined && object.tx !== null) {
      message.tx = Tx.fromPartial(object.tx);
    } else {
      message.tx = undefined;
    }
    return message;
  },
  toJSON(message: ReadTxResponse): unknown {
    const obj: any = {};
    obj.tx = message.tx ? Tx.toJSON(message.tx) : undefined;
    return obj;
  },
};

export const FindTxsRequest = {
  encode(message: FindTxsRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.address);
    writer.uint32(18).string(message.filter);
    if (message.paginate !== undefined && message.paginate !== undefined) {
      RestPaginate.encode(message.paginate, writer.uint32(26).fork()).ldelim();
    }
    writer.uint32(34).string(message.order);
    writer.uint32(42).string(message.orderBy);
    writer.uint32(48).bool(message.csv);
    return writer;
  },
  decode(reader: Reader, length?: number): FindTxsRequest {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseFindTxsRequest) as FindTxsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.filter = reader.string();
          break;
        case 3:
          message.paginate = RestPaginate.decode(reader, reader.uint32());
          break;
        case 4:
          message.order = reader.string();
          break;
        case 5:
          message.orderBy = reader.string();
          break;
        case 6:
          message.csv = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): FindTxsRequest {
    const message = Object.create(baseFindTxsRequest) as FindTxsRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = '';
    }
    if (object.filter !== undefined && object.filter !== null) {
      message.filter = String(object.filter);
    } else {
      message.filter = '';
    }
    if (object.paginate !== undefined && object.paginate !== null) {
      message.paginate = RestPaginate.fromJSON(object.paginate);
    } else {
      message.paginate = undefined;
    }
    if (object.order !== undefined && object.order !== null) {
      message.order = String(object.order);
    } else {
      message.order = '';
    }
    if (object.orderBy !== undefined && object.orderBy !== null) {
      message.orderBy = String(object.orderBy);
    } else {
      message.orderBy = '';
    }
    if (object.csv !== undefined && object.csv !== null) {
      message.csv = Boolean(object.csv);
    } else {
      message.csv = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<FindTxsRequest>): FindTxsRequest {
    const message = Object.create(baseFindTxsRequest) as FindTxsRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = '';
    }
    if (object.filter !== undefined && object.filter !== null) {
      message.filter = object.filter;
    } else {
      message.filter = '';
    }
    if (object.paginate !== undefined && object.paginate !== null) {
      message.paginate = RestPaginate.fromPartial(object.paginate);
    } else {
      message.paginate = undefined;
    }
    if (object.order !== undefined && object.order !== null) {
      message.order = object.order;
    } else {
      message.order = '';
    }
    if (object.orderBy !== undefined && object.orderBy !== null) {
      message.orderBy = object.orderBy;
    } else {
      message.orderBy = '';
    }
    if (object.csv !== undefined && object.csv !== null) {
      message.csv = object.csv;
    } else {
      message.csv = false;
    }
    return message;
  },
  toJSON(message: FindTxsRequest): unknown {
    const obj: any = {};
    obj.address = message.address || '';
    obj.filter = message.filter || '';
    obj.paginate = message.paginate ? RestPaginate.toJSON(message.paginate) : undefined;
    obj.order = message.order || '';
    obj.orderBy = message.orderBy || '';
    obj.csv = message.csv || false;
    return obj;
  },
};

export const FindTxsResponse = {
  encode(message: FindTxsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.txs) {
      TxNode.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(16).int32(message.totalCount);
    return writer;
  },
  decode(reader: Reader, length?: number): FindTxsResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseFindTxsResponse) as FindTxsResponse;
    message.txs = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txs.push(TxNode.decode(reader, reader.uint32()));
          break;
        case 2:
          message.totalCount = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): FindTxsResponse {
    const message = Object.create(baseFindTxsResponse) as FindTxsResponse;
    message.txs = [];
    if (object.txs !== undefined && object.txs !== null) {
      for (const e of object.txs) {
        message.txs.push(TxNode.fromJSON(e));
      }
    }
    if (object.totalCount !== undefined && object.totalCount !== null) {
      message.totalCount = Number(object.totalCount);
    } else {
      message.totalCount = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<FindTxsResponse>): FindTxsResponse {
    const message = Object.create(baseFindTxsResponse) as FindTxsResponse;
    message.txs = [];
    if (object.txs !== undefined && object.txs !== null) {
      for (const e of object.txs) {
        message.txs.push(TxNode.fromPartial(e));
      }
    }
    if (object.totalCount !== undefined && object.totalCount !== null) {
      message.totalCount = object.totalCount;
    } else {
      message.totalCount = 0;
    }
    return message;
  },
  toJSON(message: FindTxsResponse): unknown {
    const obj: any = {};
    if (message.txs) {
      obj.txs = message.txs.map(e => e ? TxNode.toJSON(e) : undefined);
    } else {
      obj.txs = [];
    }
    obj.totalCount = message.totalCount || 0;
    return obj;
  },
};

export const FindTxsResponseKoinly = {
  encode(message: FindTxsResponseKoinly, writer: Writer = Writer.create()): Writer {
    for (const v of message.txs) {
      TxKoinlyNode.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(16).int32(message.totalCount);
    return writer;
  },
  decode(reader: Reader, length?: number): FindTxsResponseKoinly {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseFindTxsResponseKoinly) as FindTxsResponseKoinly;
    message.txs = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txs.push(TxKoinlyNode.decode(reader, reader.uint32()));
          break;
        case 2:
          message.totalCount = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): FindTxsResponseKoinly {
    const message = Object.create(baseFindTxsResponseKoinly) as FindTxsResponseKoinly;
    message.txs = [];
    if (object.txs !== undefined && object.txs !== null) {
      for (const e of object.txs) {
        message.txs.push(TxKoinlyNode.fromJSON(e));
      }
    }
    if (object.totalCount !== undefined && object.totalCount !== null) {
      message.totalCount = Number(object.totalCount);
    } else {
      message.totalCount = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<FindTxsResponseKoinly>): FindTxsResponseKoinly {
    const message = Object.create(baseFindTxsResponseKoinly) as FindTxsResponseKoinly;
    message.txs = [];
    if (object.txs !== undefined && object.txs !== null) {
      for (const e of object.txs) {
        message.txs.push(TxKoinlyNode.fromPartial(e));
      }
    }
    if (object.totalCount !== undefined && object.totalCount !== null) {
      message.totalCount = object.totalCount;
    } else {
      message.totalCount = 0;
    }
    return message;
  },
  toJSON(message: FindTxsResponseKoinly): unknown {
    const obj: any = {};
    if (message.txs) {
      obj.txs = message.txs.map(e => e ? TxKoinlyNode.toJSON(e) : undefined);
    } else {
      obj.txs = [];
    }
    obj.totalCount = message.totalCount || 0;
    return obj;
  },
};

export const FindTxsResponseCointracker = {
  encode(message: FindTxsResponseCointracker, writer: Writer = Writer.create()): Writer {
    for (const v of message.txs) {
      TxCointrackerNode.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(16).int32(message.totalCount);
    return writer;
  },
  decode(reader: Reader, length?: number): FindTxsResponseCointracker {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseFindTxsResponseCointracker) as FindTxsResponseCointracker;
    message.txs = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txs.push(TxCointrackerNode.decode(reader, reader.uint32()));
          break;
        case 2:
          message.totalCount = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): FindTxsResponseCointracker {
    const message = Object.create(baseFindTxsResponseCointracker) as FindTxsResponseCointracker;
    message.txs = [];
    if (object.txs !== undefined && object.txs !== null) {
      for (const e of object.txs) {
        message.txs.push(TxCointrackerNode.fromJSON(e));
      }
    }
    if (object.totalCount !== undefined && object.totalCount !== null) {
      message.totalCount = Number(object.totalCount);
    } else {
      message.totalCount = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<FindTxsResponseCointracker>): FindTxsResponseCointracker {
    const message = Object.create(baseFindTxsResponseCointracker) as FindTxsResponseCointracker;
    message.txs = [];
    if (object.txs !== undefined && object.txs !== null) {
      for (const e of object.txs) {
        message.txs.push(TxCointrackerNode.fromPartial(e));
      }
    }
    if (object.totalCount !== undefined && object.totalCount !== null) {
      message.totalCount = object.totalCount;
    } else {
      message.totalCount = 0;
    }
    return message;
  },
  toJSON(message: FindTxsResponseCointracker): unknown {
    const obj: any = {};
    if (message.txs) {
      obj.txs = message.txs.map(e => e ? TxCointrackerNode.toJSON(e) : undefined);
    } else {
      obj.txs = [];
    }
    obj.totalCount = message.totalCount || 0;
    return obj;
  },
};

export const PickUnparsedTxsRequest = {
  encode(message: PickUnparsedTxsRequest, writer: Writer = Writer.create()): Writer {
    for (const v of message.txhashes) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(reader: Reader, length?: number): PickUnparsedTxsRequest {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(basePickUnparsedTxsRequest) as PickUnparsedTxsRequest;
    message.txhashes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txhashes.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PickUnparsedTxsRequest {
    const message = Object.create(basePickUnparsedTxsRequest) as PickUnparsedTxsRequest;
    message.txhashes = [];
    if (object.txhashes !== undefined && object.txhashes !== null) {
      for (const e of object.txhashes) {
        message.txhashes.push(String(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<PickUnparsedTxsRequest>): PickUnparsedTxsRequest {
    const message = Object.create(basePickUnparsedTxsRequest) as PickUnparsedTxsRequest;
    message.txhashes = [];
    if (object.txhashes !== undefined && object.txhashes !== null) {
      for (const e of object.txhashes) {
        message.txhashes.push(e);
      }
    }
    return message;
  },
  toJSON(message: PickUnparsedTxsRequest): unknown {
    const obj: any = {};
    if (message.txhashes) {
      obj.txhashes = message.txhashes.map(e => e || '');
    } else {
      obj.txhashes = [];
    }
    return obj;
  },
};

export const PickUnparsedTxsResponse = {
  encode(message: PickUnparsedTxsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.txhashes) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(reader: Reader, length?: number): PickUnparsedTxsResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(basePickUnparsedTxsResponse) as PickUnparsedTxsResponse;
    message.txhashes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txhashes.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PickUnparsedTxsResponse {
    const message = Object.create(basePickUnparsedTxsResponse) as PickUnparsedTxsResponse;
    message.txhashes = [];
    if (object.txhashes !== undefined && object.txhashes !== null) {
      for (const e of object.txhashes) {
        message.txhashes.push(String(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<PickUnparsedTxsResponse>): PickUnparsedTxsResponse {
    const message = Object.create(basePickUnparsedTxsResponse) as PickUnparsedTxsResponse;
    message.txhashes = [];
    if (object.txhashes !== undefined && object.txhashes !== null) {
      for (const e of object.txhashes) {
        message.txhashes.push(e);
      }
    }
    return message;
  },
  toJSON(message: PickUnparsedTxsResponse): unknown {
    const obj: any = {};
    if (message.txhashes) {
      obj.txhashes = message.txhashes.map(e => e || '');
    } else {
      obj.txhashes = [];
    }
    return obj;
  },
};

export const UpdateWalletRequest = {
  encode(message: UpdateWalletRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint32(message.highestParsedBlock);
    writer.uint32(16).uint32(message.status);
    writer.uint32(26).string(message.address);
    return writer;
  },
  decode(reader: Reader, length?: number): UpdateWalletRequest {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseUpdateWalletRequest) as UpdateWalletRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.highestParsedBlock = reader.uint32();
          break;
        case 2:
          message.status = reader.uint32();
          break;
        case 3:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): UpdateWalletRequest {
    const message = Object.create(baseUpdateWalletRequest) as UpdateWalletRequest;
    if (object.highestParsedBlock !== undefined && object.highestParsedBlock !== null) {
      message.highestParsedBlock = Number(object.highestParsedBlock);
    } else {
      message.highestParsedBlock = 0;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = Number(object.status);
    } else {
      message.status = 0;
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = '';
    }
    return message;
  },
  fromPartial(object: DeepPartial<UpdateWalletRequest>): UpdateWalletRequest {
    const message = Object.create(baseUpdateWalletRequest) as UpdateWalletRequest;
    if (object.highestParsedBlock !== undefined && object.highestParsedBlock !== null) {
      message.highestParsedBlock = object.highestParsedBlock;
    } else {
      message.highestParsedBlock = 0;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = 0;
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = '';
    }
    return message;
  },
  toJSON(message: UpdateWalletRequest): unknown {
    const obj: any = {};
    obj.highestParsedBlock = message.highestParsedBlock || 0;
    obj.status = message.status || 0;
    obj.address = message.address || '';
    return obj;
  },
};

export const UpdateWalletResponse = {
  encode(message: UpdateWalletResponse, writer: Writer = Writer.create()): Writer {
    if (message.wallet !== undefined && message.wallet !== undefined) {
      Wallet.encode(message.wallet, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): UpdateWalletResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseUpdateWalletResponse) as UpdateWalletResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.wallet = Wallet.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): UpdateWalletResponse {
    const message = Object.create(baseUpdateWalletResponse) as UpdateWalletResponse;
    if (object.wallet !== undefined && object.wallet !== null) {
      message.wallet = Wallet.fromJSON(object.wallet);
    } else {
      message.wallet = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<UpdateWalletResponse>): UpdateWalletResponse {
    const message = Object.create(baseUpdateWalletResponse) as UpdateWalletResponse;
    if (object.wallet !== undefined && object.wallet !== null) {
      message.wallet = Wallet.fromPartial(object.wallet);
    } else {
      message.wallet = undefined;
    }
    return message;
  },
  toJSON(message: UpdateWalletResponse): unknown {
    const obj: any = {};
    obj.wallet = message.wallet ? Wallet.toJSON(message.wallet) : undefined;
    return obj;
  },
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T[P] extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T[P] extends Date | Function | Uint8Array | undefined
  ? T[P]
  : T[P] extends infer U | undefined
  ? DeepPartial<U>
  : T[P] extends object
  ? DeepPartial<T[P]>
  : T[P]
};