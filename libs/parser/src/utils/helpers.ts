import { Event as TxEvent, EventKV, TxInfo } from '@terra-money/terra.js';
import { info } from 'console';
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
  term = tokenCleanUp(term);
  // token:amount in prism
  if (term.includes(':')) {
    const arrTerm = term.split(':');
    return {
      token: _.first(arrTerm),
      amount: _.last(arrTerm),
    };
  }

  // sometimes only the amount is provided without token
  if (/^\d+$/.test(term)) {
    return {
      token: '',
      amount: term,
    };
  }

  const amount = term.replace(/(^\d+)(.+$)/i, '$1');
  const token = term.substring(amount.length);

  if (token === undefined || amount === undefined) {
    throw new SeperateAmountFromTokenException();
  }

  return {
    token,
    amount,
  };
};

export const tokenCleanUp = (token: string): string => {
  if (_.isEmpty(token)) {
    return;
  }

  token = token.replace('cw20:', '');
  token = token.replace('native:', '');

  return token;
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

export const lpTokenCombiner = (
  identifier: string,
  tokens: string[],
): string => {
  const cTokens = tokens.join(',');
  return `${identifier},${cTokens}`;
};

export const lpTokenSplitter = (
  token: string,
): {
  identifier: string;
  tokens: string[];
} => {
  let identifier = token;
  let tokens = [token];

  if (token.includes(',')) {
    const split = _.split(token, ',');
    identifier = split.shift();
    tokens = split;
  }

  identifier = tokenCleanUp(identifier);
  tokens = tokens.map((token) => {
    return tokenCleanUp(token);
  });

  return {
    identifier,
    tokens,
  };
};

export const parseNftAmount = (input: {
  info: any;
  amount: number;
}): IAmount => {
  const { info, amount } = input;

  let token = '';

  const infoKeys = Object.keys(info);

  if (infoKeys.includes('nft')) {
    token = info.nft.contract_addr;
  } else if (infoKeys.includes('native_token')) {
    token = info.native_token.denom;
  }

  return {
    token,
    amount: amount as unknown as string,
  };
};

export const isTxInitiator = (walletAddress: string, txInfo: TxInfo) => {
  const tx: any = txInfo.tx;
  const msg = tx.value.msg;

  const initiateMarkerKeys = [
    'sender',
    'voter',
    'from_address',
    'delegator_address',
    'trader',
  ];

  const initiatorAddress = msg.find(({ value }) => {
    const key = _.first(_.intersection(Object.keys(value), initiateMarkerKeys));
    if (_.isEmpty(key)) {
      throw `Unable to identify fee key for the tx ${txInfo.txhash}`;
    }
    return value[key] === walletAddress;
  });

  return !_.isEmpty(initiatorAddress);
};
