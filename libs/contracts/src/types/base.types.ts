import { ObjectType, GraphQLISODateTime, Field, ID } from '@nestjs/graphql';
import { Filterable } from '@trackterra/core/decorators/filterable';
import { CursorScaler } from '@trackterra/core/scalers';
import { ClassType } from '@trackterra/common';
import { ObjectID } from 'mongodb';

@ObjectType({ isAbstract: true })
export abstract class Node {
  @Filterable()
  @Field(() => ID)
  id?: string | ObjectID;

  @Filterable()
  @Field(() => GraphQLISODateTime)
  createdAt?: string | Date;

  @Filterable()
  @Field(() => GraphQLISODateTime)
  updatedAt?: string | Date;
}

@ObjectType()
class PageInfo {
  @Field(() => CursorScaler, { nullable: true })
  startCursor?: string;

  @Field({ nullable: true })
  hasNextPage: boolean;

  @Field({ nullable: true })
  hasPreviousPage: boolean;

  @Field(() => CursorScaler, { nullable: true })
  endCursor?: string;
}

export function ExtendConnectionType<TItem>(TItemClass: ClassType<TItem>): any {
  @ObjectType(`${TItemClass.name}Edge`)
  class EdgeTypeClass {
    @Field(() => TItemClass)
    node: TItem;

    @Field(() => CursorScaler)
    cursor: string;
  }

  @ObjectType(`${TItemClass.name}Connection`, { isAbstract: true })
  abstract class ConnectionTypeClass {
    @Field(() => [EdgeTypeClass], { nullable: true })
    edges?: [EdgeTypeClass];

    @Field(() => PageInfo)
    pageInfo: PageInfo;
  }

  return ConnectionTypeClass;
}

@ObjectType()
export class GeoLocation {
  @Field()
  longitude?: string;

  @Field()
  latitude?: string;
}
