import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from 'src/typeorm';

// Own files.
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Warehouse]),],
  controllers: [WarehousesController],
  providers: [WarehousesService]
})
export class WarehousesModule {}
