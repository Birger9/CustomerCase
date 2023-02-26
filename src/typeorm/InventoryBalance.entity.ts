import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from './product.entity';
import { Warehouse } from './warehouse.entity';

@Entity()
export class InventoryBalance {
    @PrimaryColumn()
    productNumber: string;
  
    @PrimaryColumn()
    city: string;
  
    @ManyToOne(() => Product, (product) => product.warehouseConnection)
    @JoinColumn({ name: 'productNumber' })
    product: Product;
  
    @ManyToOne(() => Warehouse, (warehouse) => warehouse.productConnection)
    @JoinColumn({ name: 'city' })
    warehouse: Warehouse;
}
