import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Warehouse } from './warehouse.entity';

@Entity()
export class Delivery {
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
    quantityMoved: number

    @CreateDateColumn()
    date: Date;
  
    @ManyToOne(() => Product, (product) => product.deliveryConnection, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'name'})
    product: Product;
  
    @ManyToOne(() => Warehouse, (warehouse) => warehouse.deliveryConnection, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'city' })
    warehouse: Warehouse;
}