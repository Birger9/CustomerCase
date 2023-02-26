import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from 'src/typeorm';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery]),],
  controllers: [DeliveryController],
  providers: [DeliveryService]
})
export class DeliveryModule {}
