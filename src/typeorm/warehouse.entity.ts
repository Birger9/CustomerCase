import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
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
  )
  public productConnection: InventoryBalance[];
}