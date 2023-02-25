import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryColumn({
    name: 'product_number',
    nullable: false,
  })
  productNumber: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  price: number;
}
