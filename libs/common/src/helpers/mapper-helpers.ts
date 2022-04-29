import _ = require('lodash');
import moment = require('moment');

export function timeToCalendarFormat<T extends string | Date>(time: T): string {
  try {
    return moment(time).calendar();
  } catch (e) {
    console.log(e);
  }
}

export function timeToRegularDateTime<T extends string | Date>(
  time: T,
): string {
  try {
    return moment(time).format('MMM D YY H:mm');
  } catch (e) {
    console.log(e);
  }
}

export function timeToUtc(time: string | Date) {
  if (!time) {
    return;
  }

  const FORMAT = 'YYYY-MM-DD HH:mm:ss';
  return moment(time).utc().format(FORMAT);
}

export function fShortenHash(text: string): string {
  if (_.isEmpty(text)) {
    return '';
  }

  if (text.length <= 8) {
    return text;
  }

  const firstPart = text.substring(0, 4);
  const secondPart = text.substring(text.length - 4);

  return `${firstPart}...${secondPart}`;
}

export function queryMapper(q: string) {
  const query = JSON.parse(q);

  let conj = '';

  const prepare = (where) => {
    const { field, operator, value } = where;
    if (operator) {
      const cond = {};
      const condValue = {};
      condValue[operator] = value;
      cond[field] = condValue;

      return cond;
    }

    const { combinator, rules } = where;
    if (combinator) {
      conj = combinator === 'and' ? '_AND' : '_OR';
      const r = _.map(rules, (value) => {
        return prepare(value);
      });

      const objR = {};
      objR[conj] = r;

      return objR;
    }
  };

  const result = prepare(query);
  return result;
}

export function seperateIndexFromToken(token: string): {
  token: string;
  index: number;
} {
  if (_.isEmpty(token)) {
    return;
  }

  // e.g: UST-LUNA_LP_1
  const splitToken = _.split(token, '_LP_');

  if (_.size(splitToken) !== 2) {
    return {
      token,
      index: undefined,
    };
  }

  return {
    token: _.first(splitToken) + '_LP',
    index: _.last(splitToken) as unknown as number,
  };
}
