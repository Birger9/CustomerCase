import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Warehouse {
  @PrimaryColumn({
    nullable: false,
  })
  city: string;
}