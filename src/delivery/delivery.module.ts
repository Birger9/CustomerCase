import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryBalanceModule } from 'src/inventory-balance/inventory-balance.module';
import { Delivery } from 'src/typeorm';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery]), InventoryBalanceModule],
  controllers: [DeliveryController],
  providers: [DeliveryService],
  exports: [DeliveryService]
})
export class DeliveryModule {}
