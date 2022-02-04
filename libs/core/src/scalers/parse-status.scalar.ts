import { Scalar, CustomScalar } from '@nestjs/graphql';
import { ValueNode } from 'graphql';
import { PARSING_STATUS } from '../constants/parsing.constants';

@Scalar('ParseStatus')
export class ParseStatusScalar implements CustomScalar<string, string> {
  description = 'Date custom scalar type';

  parseValue(value: number): string {
    return null;
  }

  serialize(value: number): string {
    return PARSING_STATUS[value];
  }

  parseLiteral(ast: ValueNode): string {
    return null;
  }
}
