import { registerEnumType } from '@nestjs/graphql';

export enum Chain {
  luna = 'Luna',
  lunc = 'Lunc',
}

registerEnumType(Chain, {
  name: 'ChainField',
  description: 'Supported chains field',
});
