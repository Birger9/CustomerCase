import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Warehouse } from './warehouse.entity';

@Entity()
export class InventoryBalance {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number

    @Column({
        nullable: false,
    })
    name: string;
  
    @Column({
        nullable: false,
    })
    city: string;

    @Column({
        type: 'int',
        nullable: false,
    })
    balance: number
  
    @ManyToOne(() => Product, (product) => product.warehouseConnection, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'name'})
    product: Product;
  
    @ManyToOne(() => Warehouse, (warehouse) => warehouse.productConnection, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'city' })
    warehouse: Warehouse;
}
