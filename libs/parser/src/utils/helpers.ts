import { Event as TxEvent, EventKV } from '@terra-money/terra.js';
import _ = require('lodash');
import { SeperateAmountFromTokenException } from '../exceptions';
import { IAmount } from '../parser';

export const findAttributes = (
  events: TxEvent[] | undefined,
  type: string,
  attribute?: {
    key: string;
    value: string;
  },
): EventKV[] | undefined => {
  if (events === undefined) {
    return undefined;
  }

  if (attribute) {
    for (const event of events) {
      if (event.type === type) {
        for (const attr of event.attributes) {
          if (attr.key === attribute.key && attr.value === attribute.value) {
            return event.attributes;
          }
        }
      }
    }
    return undefined;
  }

  return events.find((event) => event.type === type)?.attributes;
};

export const separateAmountFromToken = (term: string): IAmount => {
  const amount = (term).replace(/(^\d+)(.+$)/i,'$1');
  const token = term.substring(amount.length);

  if (token === undefined || amount === undefined) {
    throw new SeperateAmountFromTokenException();
  }

  return {
    token,
    amount,
  };
};

export const splitTokens = (tokens: string): IAmount[] => {
  if (_.isEmpty(tokens)) {
    return [];
  }

  const tokensWithoutSpace = _.replace(tokens, ' ', '');
  const assetsSep = _.split(tokensWithoutSpace, ',');
  
  return assetsSep.map((asset) => {
    return separateAmountFromToken(asset);
  });
};

export const lpTokenCombiner = (identifier: string, tokens: IAmount[]): string => {
  const cTokens = tokens.map(token => token.token).join(',');
  return `${identifier},${cTokens}`
}

export const lpTokenSplitter = (token: string): {
  identifier: string,
  tokens: string[]
} => {

  const split = _.split(token, ",");

  if(split.length > 1) {
    const identifier = split.shift();
    const tokens = split;
    return {
      identifier,
      tokens
    }
  }

  return {
    identifier: token,
    tokens: [token],
  };
}
