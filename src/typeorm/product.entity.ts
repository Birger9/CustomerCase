import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Delivery } from './delivery.entity';
import { InventoryBalance } from './InventoryBalance.entity';

@Entity()
export class Product {
  @Column({
    name: 'product_number',
    nullable: false,
  })
  productNumber: string;

  @PrimaryColumn({
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
    (inventoryBalance) => inventoryBalance.name,
    {
      cascade: true,
    }
  )
  public warehouseConnection!: InventoryBalance[];

  @OneToMany(
    () => Delivery,
    (delivery) => delivery.name,
    {
      cascade: true,
    }
  )
  public deliveryConnection!: Delivery[];
}
