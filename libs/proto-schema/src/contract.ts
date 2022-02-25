/* eslint-disable */
import { Observable } from 'rxjs';
import { Writer, Reader } from 'protobufjs/minimal';


export interface Currency {
  name: string;
  symbol: string;
  nullIndex: number;
  decimals: number;
  identifier: string;
  icon: string;
  isStable: boolean;
}

export interface UpsertCurrencyRequest {
  identifier: string;
}

export interface UpsertCurrencyResponse {
  currency: Currency | undefined;
}

export interface FindCurrencyRequest {
  filter: string;
}

export interface FindCurrencyResponse {
  currency: Currency | undefined;
}

export interface FindCurrenciesRequest {
}

export interface FindCurrenciesResponse {
  currencies: Currency[];
}

const baseCurrency: object = {
  name: '',
  symbol: '',
  nullIndex: 0,
  decimals: 0,
  identifier: '',
  icon: '',
  isStable: false,
};

const baseUpsertCurrencyRequest: object = {
  identifier: '',
};

const baseUpsertCurrencyResponse: object = {
  currency: undefined,
};

const baseFindCurrencyRequest: object = {
  filter: '',
};

const baseFindCurrencyResponse: object = {
  currency: undefined,
};

const baseFindCurrenciesRequest: object = {
};

const baseFindCurrenciesResponse: object = {
  currencies: undefined,
};

export interface ContractService<Context extends DataLoaders> {

  upsertCurrency(request: UpsertCurrencyRequest, ctx: Context): Promise<UpsertCurrencyResponse>;

  listCurrencies(request: FindCurrenciesRequest, ctx: Context): Promise<FindCurrenciesResponse>;

}

export interface ContractServiceClient<Context extends DataLoaders> {

  upsertCurrency(request: UpsertCurrencyRequest, ctx?: Context): Observable<UpsertCurrencyResponse>;

  listCurrencies(request: FindCurrenciesRequest, ctx?: Context): Observable<FindCurrenciesResponse>;

}

interface DataLoaders {

  getDataLoader<T>(identifier: string, constructorFn: () => T): T;

}

export const Currency = {
  encode(message: Currency, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    writer.uint32(18).string(message.symbol);
    writer.uint32(24).int32(message.nullIndex);
    writer.uint32(32).int32(message.decimals);
    writer.uint32(42).string(message.identifier);
    writer.uint32(50).string(message.icon);
    writer.uint32(56).bool(message.isStable);
    return writer;
  },
  decode(reader: Reader, length?: number): Currency {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCurrency) as Currency;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.symbol = reader.string();
          break;
        case 3:
          message.nullIndex = reader.int32();
          break;
        case 4:
          message.decimals = reader.int32();
          break;
        case 5:
          message.identifier = reader.string();
          break;
        case 6:
          message.icon = reader.string();
          break;
        case 7:
          message.isStable = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Currency {
    const message = Object.create(baseCurrency) as Currency;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = '';
    }
    if (object.symbol !== undefined && object.symbol !== null) {
      message.symbol = String(object.symbol);
    } else {
      message.symbol = '';
    }
    if (object.nullIndex !== undefined && object.nullIndex !== null) {
      message.nullIndex = Number(object.nullIndex);
    } else {
      message.nullIndex = 0;
    }
    if (object.decimals !== undefined && object.decimals !== null) {
      message.decimals = Number(object.decimals);
    } else {
      message.decimals = 0;
    }
    if (object.identifier !== undefined && object.identifier !== null) {
      message.identifier = String(object.identifier);
    } else {
      message.identifier = '';
    }
    if (object.icon !== undefined && object.icon !== null) {
      message.icon = String(object.icon);
    } else {
      message.icon = '';
    }
    if (object.isStable !== undefined && object.isStable !== null) {
      message.isStable = Boolean(object.isStable);
    } else {
      message.isStable = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Currency>): Currency {
    const message = Object.create(baseCurrency) as Currency;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = '';
    }
    if (object.symbol !== undefined && object.symbol !== null) {
      message.symbol = object.symbol;
    } else {
      message.symbol = '';
    }
    if (object.nullIndex !== undefined && object.nullIndex !== null) {
      message.nullIndex = object.nullIndex;
    } else {
      message.nullIndex = 0;
    }
    if (object.decimals !== undefined && object.decimals !== null) {
      message.decimals = object.decimals;
    } else {
      message.decimals = 0;
    }
    if (object.identifier !== undefined && object.identifier !== null) {
      message.identifier = object.identifier;
    } else {
      message.identifier = '';
    }
    if (object.icon !== undefined && object.icon !== null) {
      message.icon = object.icon;
    } else {
      message.icon = '';
    }
    if (object.isStable !== undefined && object.isStable !== null) {
      message.isStable = object.isStable;
    } else {
      message.isStable = false;
    }
    return message;
  },
  toJSON(message: Currency): unknown {
    const obj: any = {};
    obj.name = message.name || '';
    obj.symbol = message.symbol || '';
    obj.nullIndex = message.nullIndex || 0;
    obj.decimals = message.decimals || 0;
    obj.identifier = message.identifier || '';
    obj.icon = message.icon || '';
    obj.isStable = message.isStable || false;
    return obj;
  },
};

export const UpsertCurrencyRequest = {
  encode(message: UpsertCurrencyRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.identifier);
    return writer;
  },
  decode(reader: Reader, length?: number): UpsertCurrencyRequest {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseUpsertCurrencyRequest) as UpsertCurrencyRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.identifier = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): UpsertCurrencyRequest {
    const message = Object.create(baseUpsertCurrencyRequest) as UpsertCurrencyRequest;
    if (object.identifier !== undefined && object.identifier !== null) {
      message.identifier = String(object.identifier);
    } else {
      message.identifier = '';
    }
    return message;
  },
  fromPartial(object: DeepPartial<UpsertCurrencyRequest>): UpsertCurrencyRequest {
    const message = Object.create(baseUpsertCurrencyRequest) as UpsertCurrencyRequest;
    if (object.identifier !== undefined && object.identifier !== null) {
      message.identifier = object.identifier;
    } else {
      message.identifier = '';
    }
    return message;
  },
  toJSON(message: UpsertCurrencyRequest): unknown {
    const obj: any = {};
    obj.identifier = message.identifier || '';
    return obj;
  },
};

export const UpsertCurrencyResponse = {
  encode(message: UpsertCurrencyResponse, writer: Writer = Writer.create()): Writer {
    if (message.currency !== undefined && message.currency !== undefined) {
      Currency.encode(message.currency, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): UpsertCurrencyResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseUpsertCurrencyResponse) as UpsertCurrencyResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currency = Currency.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): UpsertCurrencyResponse {
    const message = Object.create(baseUpsertCurrencyResponse) as UpsertCurrencyResponse;
    if (object.currency !== undefined && object.currency !== null) {
      message.currency = Currency.fromJSON(object.currency);
    } else {
      message.currency = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<UpsertCurrencyResponse>): UpsertCurrencyResponse {
    const message = Object.create(baseUpsertCurrencyResponse) as UpsertCurrencyResponse;
    if (object.currency !== undefined && object.currency !== null) {
      message.currency = Currency.fromPartial(object.currency);
    } else {
      message.currency = undefined;
    }
    return message;
  },
  toJSON(message: UpsertCurrencyResponse): unknown {
    const obj: any = {};
    obj.currency = message.currency ? Currency.toJSON(message.currency) : undefined;
    return obj;
  },
};

export const FindCurrencyRequest = {
  encode(message: FindCurrencyRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.filter);
    return writer;
  },
  decode(reader: Reader, length?: number): FindCurrencyRequest {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseFindCurrencyRequest) as FindCurrencyRequest;
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
  fromJSON(object: any): FindCurrencyRequest {
    const message = Object.create(baseFindCurrencyRequest) as FindCurrencyRequest;
    if (object.filter !== undefined && object.filter !== null) {
      message.filter = String(object.filter);
    } else {
      message.filter = '';
    }
    return message;
  },
  fromPartial(object: DeepPartial<FindCurrencyRequest>): FindCurrencyRequest {
    const message = Object.create(baseFindCurrencyRequest) as FindCurrencyRequest;
    if (object.filter !== undefined && object.filter !== null) {
      message.filter = object.filter;
    } else {
      message.filter = '';
    }
    return message;
  },
  toJSON(message: FindCurrencyRequest): unknown {
    const obj: any = {};
    obj.filter = message.filter || '';
    return obj;
  },
};

export const FindCurrencyResponse = {
  encode(message: FindCurrencyResponse, writer: Writer = Writer.create()): Writer {
    if (message.currency !== undefined && message.currency !== undefined) {
      Currency.encode(message.currency, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): FindCurrencyResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseFindCurrencyResponse) as FindCurrencyResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currency = Currency.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): FindCurrencyResponse {
    const message = Object.create(baseFindCurrencyResponse) as FindCurrencyResponse;
    if (object.currency !== undefined && object.currency !== null) {
      message.currency = Currency.fromJSON(object.currency);
    } else {
      message.currency = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<FindCurrencyResponse>): FindCurrencyResponse {
    const message = Object.create(baseFindCurrencyResponse) as FindCurrencyResponse;
    if (object.currency !== undefined && object.currency !== null) {
      message.currency = Currency.fromPartial(object.currency);
    } else {
      message.currency = undefined;
    }
    return message;
  },
  toJSON(message: FindCurrencyResponse): unknown {
    const obj: any = {};
    obj.currency = message.currency ? Currency.toJSON(message.currency) : undefined;
    return obj;
  },
};

export const FindCurrenciesRequest = {
  encode(message: FindCurrenciesRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(reader: Reader, length?: number): FindCurrenciesRequest {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseFindCurrenciesRequest) as FindCurrenciesRequest;
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
  fromJSON(object: any): FindCurrenciesRequest {
    const message = Object.create(baseFindCurrenciesRequest) as FindCurrenciesRequest;
    return message;
  },
  fromPartial(object: DeepPartial<FindCurrenciesRequest>): FindCurrenciesRequest {
    const message = Object.create(baseFindCurrenciesRequest) as FindCurrenciesRequest;
    return message;
  },
  toJSON(message: FindCurrenciesRequest): unknown {
    const obj: any = {};
    return obj;
  },
};

export const FindCurrenciesResponse = {
  encode(message: FindCurrenciesResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.currencies) {
      Currency.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): FindCurrenciesResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseFindCurrenciesResponse) as FindCurrenciesResponse;
    message.currencies = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currencies.push(Currency.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): FindCurrenciesResponse {
    const message = Object.create(baseFindCurrenciesResponse) as FindCurrenciesResponse;
    message.currencies = [];
    if (object.currencies !== undefined && object.currencies !== null) {
      for (const e of object.currencies) {
        message.currencies.push(Currency.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<FindCurrenciesResponse>): FindCurrenciesResponse {
    const message = Object.create(baseFindCurrenciesResponse) as FindCurrenciesResponse;
    message.currencies = [];
    if (object.currencies !== undefined && object.currencies !== null) {
      for (const e of object.currencies) {
        message.currencies.push(Currency.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: FindCurrenciesResponse): unknown {
    const obj: any = {};
    if (message.currencies) {
      obj.currencies = message.currencies.map(e => e ? Currency.toJSON(e) : undefined);
    } else {
      obj.currencies = [];
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