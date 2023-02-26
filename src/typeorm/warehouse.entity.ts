import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Delivery } from './delivery.entity';
import { InventoryBalance } from './InventoryBalance.entity';

@Entity()
export class Warehouse {
  @PrimaryColumn({
    nullable: false,
  })
  city: string;

  @OneToMany(
    () => InventoryBalance,
    (inventoryBalance) => inventoryBalance.city,
    {
      cascade: true,
    }
  )
  public productConnection!: InventoryBalance[];

  @OneToMany(
    () => Delivery,
    (delivery) => delivery.city,
    {
      cascade: true,
    }
  )
  public deliveryConnection!: Delivery[];
}