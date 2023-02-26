import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Delivery } from './delivery.entity';
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
    {
      cascade: true,
    }
  )
  public warehouseConnection!: InventoryBalance[];

  @OneToMany(
    () => Delivery,
    (delivery) => delivery.productNumber,
    {
      cascade: true,
    }
  )
  public deliveryConnection!: Delivery[];
}
