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
  term = term.replace("cw20:", "");
  term = term.replace("native:", "");

  // token:amount in prism
  if(term.includes(":")) {
    const arrTerm = term.split(":");
    return {
      token: _.first(arrTerm),
      amount: _.last(arrTerm),
    }
  }

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
  
  const tt = assetsSep.map((asset) => {
    return separateAmountFromToken(asset);
  });
  console.dir({
    "the tt is": tt
  }, {depth: 'null'});
  
  return assetsSep.map((asset) => {
    return separateAmountFromToken(asset);
  });
};

export const lpTokenCombiner = (identifier: string, tokens: string[]): string => {
  const cTokens = tokens.join(',');
  return `${identifier},${cTokens}`
}

export const lpTokenSplitter = (token: string): {
  identifier: string,
  tokens: string[]
} => {

  let identifier = token;
  let tokens = [token];

  if(token.includes(",")) {
    const split = _.split(token, ",");
    identifier = split.shift();
    tokens = split;
  }

  // remove native: cw20: prefixes
  const identifierColIndex = identifier.indexOf(":");
  if(identifierColIndex > -1) {
    identifier = identifier.substring(identifierColIndex + 1);
  }

  // remove native: cw20: prefixes
  tokens = tokens.map((tk) => {
    const colIndex = tk.indexOf(":");

    if(colIndex > -1) {
      return tk.substring(colIndex + 1);
    }
    return tk;
  });

  return {
    identifier,
    tokens,
  };
}
