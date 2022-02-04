import { RemoteGraphQLDataSource } from '@apollo/gateway';

const unSafeHeaders = [
  'accept-encoding',
  'accept',
  'content-length',
  'connection',
];

export class HeadersDatasource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    if (context.req) {
      if (context.req.headers) {
        const ctxHeaders = context.req.headers;

        for (const key in ctxHeaders) {
          if (
            ctxHeaders.hasOwnProperty(key) &&
            unSafeHeaders.indexOf(key) === -1
          ) {
            request.http.headers.set(key, ctxHeaders[key]);
          }
        }
      }
    }
  }

  async didReceiveResponse({ response, request, context }) {
    const body = await super.didReceiveResponse({ response, request, context });

    if (context.res) {
      if (
        response.headers.get('set-cookie') !== null &&
        response.headers.get('set-cookie') !== undefined
      ) {
        context.res.cookie(response.headers.get('set-cookie'));
      }
    }
    return body;
  }
}
