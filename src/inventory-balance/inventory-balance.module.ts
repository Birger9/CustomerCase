import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryBalance } from 'src/typeorm/InventoryBalance.entity';
import { InventoryBalanceController } from './inventory-balance.controller';
import { InventoryBalanceService } from './inventory-balance.service';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryBalance]),],
  controllers: [InventoryBalanceController],
  providers: [InventoryBalanceService]
})
export class InventoryBalanceModule {}
