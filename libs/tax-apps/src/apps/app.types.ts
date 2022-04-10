export type AppAttrType = {
  id: string;
  title: string;
  formatter?: (param: { attrValue: any; row: any }) => any;
};

/**
 * Format rows before formatting cells
 */
export type RowFormatterType = {
  formatter?: (tx: any) => any;
};
