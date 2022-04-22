import { Request as ExpressRequest } from 'express';
import {
  ParserRpcClientService,
  ContractRpcClientService,
} from '@trackterra/core/services';
import { Context } from 'apollo-server-core/src/types';

export interface IRequest extends ExpressRequest {}
export interface GqlContext extends Partial<Context> {
  connection?: any;
  rpc: {
    parser: ParserRpcClientService;
    currency: ContractRpcClientService;
  };
}
