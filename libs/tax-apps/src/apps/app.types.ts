export type AppAttrType = {
  id: string;
  title: string;
  formatter?: (param: { attrValue: any; row: any }) => any;
};
