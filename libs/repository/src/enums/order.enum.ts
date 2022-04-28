import { registerEnumType } from '@nestjs/graphql';

export enum Order {
  ASC = 1,
  DESC = -1,
}

registerEnumType(Order, {
  name: 'OrderField',
  description: 'Sort direction',
});
