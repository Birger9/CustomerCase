import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryBalanceModule } from 'src/inventory-balance/inventory-balance.module';
import { Warehouse } from 'src/typeorm';

// Own files.
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Warehouse]), InventoryBalanceModule],
  controllers: [WarehousesController],
  providers: [WarehousesService]
})
export class WarehousesModule {}
