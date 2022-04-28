// skip number of records mongo
export const skipRecord = (page: number, take: number) => {
  return (page - 1) * take;
};
