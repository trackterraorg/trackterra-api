/* eslint-disable */
import { Observable } from 'rxjs';
import { Writer, Reader } from 'protobufjs/minimal';


export interface ParseWalletRequest {
  address: string;
  highestParsedBlockHeight: number;
}

export interface ParseWalletResponse {
  numberOfNewParsedTxs: number;
  status: number;
  msg: string;
}

export interface SupportedProtocolsRequest {
}

export interface SupportedProtocol {
  protocolName: string;
  txType: string;
}

export interface SupportedProtocolsResponse {
  protocols: SupportedProtocol[];
}

const baseParseWalletRequest: object = {
  address: '',
  highestParsedBlockHeight: 0,
};

const baseParseWalletResponse: object = {
  numberOfNewParsedTxs: 0,
  status: 0,
  msg: '',
};

const baseSupportedProtocolsRequest: object = {
};

const baseSupportedProtocol: object = {
  protocolName: '',
  txType: '',
};

const baseSupportedProtocolsResponse: object = {
  protocols: undefined,
};

export interface ParserService<Context extends DataLoaders> {

  doParse(request: ParseWalletRequest, ctx: Context): Promise<ParseWalletResponse>;

  supportedProtocols(request: SupportedProtocolsRequest, ctx: Context): Promise<SupportedProtocolsResponse>;

}

export interface ParserServiceClient<Context extends DataLoaders> {

  doParse(request: ParseWalletRequest, ctx?: Context): Observable<ParseWalletResponse>;

  supportedProtocols(request: SupportedProtocolsRequest, ctx?: Context): Observable<SupportedProtocolsResponse>;

}

interface DataLoaders {

  getDataLoader<T>(identifier: string, constructorFn: () => T): T;

}

export const ParseWalletRequest = {
  encode(message: ParseWalletRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.address);
    writer.uint32(16).uint32(message.highestParsedBlockHeight);
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
        case 2:
          message.highestParsedBlockHeight = reader.uint32();
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
    if (object.highestParsedBlockHeight !== undefined && object.highestParsedBlockHeight !== null) {
      message.highestParsedBlockHeight = Number(object.highestParsedBlockHeight);
    } else {
      message.highestParsedBlockHeight = 0;
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
    if (object.highestParsedBlockHeight !== undefined && object.highestParsedBlockHeight !== null) {
      message.highestParsedBlockHeight = object.highestParsedBlockHeight;
    } else {
      message.highestParsedBlockHeight = 0;
    }
    return message;
  },
  toJSON(message: ParseWalletRequest): unknown {
    const obj: any = {};
    obj.address = message.address || '';
    obj.highestParsedBlockHeight = message.highestParsedBlockHeight || 0;
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
          message.status = reader.int32();
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
      message.status = Number(object.status);
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
    obj.status = message.status || 0;
    obj.msg = message.msg || '';
    return obj;
  },
};

export const SupportedProtocolsRequest = {
  encode(message: SupportedProtocolsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(reader: Reader, length?: number): SupportedProtocolsRequest {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseSupportedProtocolsRequest) as SupportedProtocolsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SupportedProtocolsRequest {
    const message = Object.create(baseSupportedProtocolsRequest) as SupportedProtocolsRequest;
    return message;
  },
  fromPartial(object: DeepPartial<SupportedProtocolsRequest>): SupportedProtocolsRequest {
    const message = Object.create(baseSupportedProtocolsRequest) as SupportedProtocolsRequest;
    return message;
  },
  toJSON(message: SupportedProtocolsRequest): unknown {
    const obj: any = {};
    return obj;
  },
};

export const SupportedProtocol = {
  encode(message: SupportedProtocol, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.protocolName);
    writer.uint32(18).string(message.txType);
    return writer;
  },
  decode(reader: Reader, length?: number): SupportedProtocol {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseSupportedProtocol) as SupportedProtocol;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.protocolName = reader.string();
          break;
        case 2:
          message.txType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SupportedProtocol {
    const message = Object.create(baseSupportedProtocol) as SupportedProtocol;
    if (object.protocolName !== undefined && object.protocolName !== null) {
      message.protocolName = String(object.protocolName);
    } else {
      message.protocolName = '';
    }
    if (object.txType !== undefined && object.txType !== null) {
      message.txType = String(object.txType);
    } else {
      message.txType = '';
    }
    return message;
  },
  fromPartial(object: DeepPartial<SupportedProtocol>): SupportedProtocol {
    const message = Object.create(baseSupportedProtocol) as SupportedProtocol;
    if (object.protocolName !== undefined && object.protocolName !== null) {
      message.protocolName = object.protocolName;
    } else {
      message.protocolName = '';
    }
    if (object.txType !== undefined && object.txType !== null) {
      message.txType = object.txType;
    } else {
      message.txType = '';
    }
    return message;
  },
  toJSON(message: SupportedProtocol): unknown {
    const obj: any = {};
    obj.protocolName = message.protocolName || '';
    obj.txType = message.txType || '';
    return obj;
  },
};

export const SupportedProtocolsResponse = {
  encode(message: SupportedProtocolsResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.protocols) {
      SupportedProtocol.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): SupportedProtocolsResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseSupportedProtocolsResponse) as SupportedProtocolsResponse;
    message.protocols = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.protocols.push(SupportedProtocol.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SupportedProtocolsResponse {
    const message = Object.create(baseSupportedProtocolsResponse) as SupportedProtocolsResponse;
    message.protocols = [];
    if (object.protocols !== undefined && object.protocols !== null) {
      for (const e of object.protocols) {
        message.protocols.push(SupportedProtocol.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<SupportedProtocolsResponse>): SupportedProtocolsResponse {
    const message = Object.create(baseSupportedProtocolsResponse) as SupportedProtocolsResponse;
    message.protocols = [];
    if (object.protocols !== undefined && object.protocols !== null) {
      for (const e of object.protocols) {
        message.protocols.push(SupportedProtocol.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: SupportedProtocolsResponse): unknown {
    const obj: any = {};
    if (message.protocols) {
      obj.protocols = message.protocols.map(e => e ? SupportedProtocol.toJSON(e) : undefined);
    } else {
      obj.protocols = [];
    }
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