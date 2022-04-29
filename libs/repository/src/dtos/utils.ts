import { toNumber } from 'lodash';

// skip number of records mongo
export const skipRecord = (page: number, take: number) => {
  return (page - 1) * take;
};

export const limitRecord = (limit: number, take = 10) => {
  return toNumber(limit ?? take);
};
