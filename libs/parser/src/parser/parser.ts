import { ParserProcessArgs } from './args';
import { ParseProcessors } from './processers';

const parserProcessTypeMap = {
  ...ParseProcessors,
};

export const parserClasses = Object.keys(parserProcessTypeMap);

type Keys = keyof typeof parserProcessTypeMap;
type ParserTypes = typeof parserProcessTypeMap[Keys];
type ExtractInstanceType<T> = T extends new () => infer R ? R : never;

class ParserFactory {
  static getParser(k: Keys): ExtractInstanceType<ParserTypes> {
    return new parserProcessTypeMap[k]();
  }
}

export class Parser {
  static process(args: ParserProcessArgs) {
    const parserClass = (args.txType.parserClass ?? 'GenericTransfer') as Keys;

    return ParserFactory.getParser(parserClass).process(args);
  }
}
