import { Metadata } from 'grpc';
import { GqlContext } from '../';

export function setRpcContext(ctx: GqlContext, inApp?: boolean): Metadata {
  const meta = new Metadata();

  if (inApp) {
    meta.set('inApp', inApp.toString());
  }
  return meta;
}

export function getIdentityFromCtx(meta: Metadata): {
  inApp;
} {
  const gmap = meta.getMap();
  const tempInApp = gmap.inapp;

  let inApp = false;

  if (tempInApp && typeof tempInApp === 'string') {
    inApp = Boolean(inApp);
  }

  return {
    inApp,
  };
}
