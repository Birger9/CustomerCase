import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from './product.entity';
import { Warehouse } from './warehouse.entity';

@Entity()
export class InventoryBalance {
    @PrimaryColumn({
        nullable: false,
    })
    productNumber: string;
  
    @PrimaryColumn({
        nullable: false,
    })
    city: string;

    @Column({
        type: 'int',
        nullable: false,
    })
    balance: number
  
    @ManyToOne(() => Product, (product) => product.warehouseConnection, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'productNumber' })
    product: Product;
  
    @ManyToOne(() => Warehouse, (warehouse) => warehouse.productConnection, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'city' })
    warehouse: Warehouse;
}
