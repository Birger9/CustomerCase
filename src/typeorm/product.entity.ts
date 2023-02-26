import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { InventoryBalance } from './InventoryBalance.entity';

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

  @OneToMany(
    () => InventoryBalance,
    (inventoryBalance) => inventoryBalance.productNumber,
  )
  public warehouseConnection: InventoryBalance[];
}
