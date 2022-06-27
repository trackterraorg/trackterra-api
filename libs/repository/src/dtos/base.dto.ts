import { BaseEntity } from '../entities';
import { ObjectID } from 'mongodb';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @Expose()
  @ApiProperty()
  id?: string | ObjectID;
  createdAt?: Date | string;
  updatedAt?: Date | string;

  constructor(entity: BaseEntity) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
