import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryBalanceModule } from 'src/inventory-balance/inventory-balance.module';
import { Product } from 'src/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), InventoryBalanceModule],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
