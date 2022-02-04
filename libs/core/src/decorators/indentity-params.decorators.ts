import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const HttpCurrentIdentity = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user && user[data] : user;
  },
);

export const RpcCurrentIdentity = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToRpc().getContext();
    console.log('***************');
    console.log(data, request);
    console.log('***************');
    return null;
  },
);
