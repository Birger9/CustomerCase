import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeliveryDto } from 'src/dtos/delivery.dtos';
import { InventoryBalanceService } from 'src/inventory-balance/inventory-balance.service';
import { Delivery, InventoryBalance } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryService {
    constructor(
        @InjectRepository(Delivery)
        private readonly deliveryRepository: Repository<Delivery>,
        private readonly InventoryBalanceService: InventoryBalanceService,
      ) {}
          
    async createDelivery(createDeliveryDto: CreateDeliveryDto) {
      let name = createDeliveryDto.name;
      let city = createDeliveryDto.city;
  
      let delivery = await this.deliveryRepository.findOne({where: {name: name, city: city}});
      if (!delivery) {

        let inventoryBalance = await this.InventoryBalanceService.findInventoryBalanceByNameAndCity(name, city);
        if (inventoryBalance) {
          await this.InventoryBalanceService.updateInventoryBalance(inventoryBalance, createDeliveryDto.quantityMoved.toString());

          const newDelivery = this.deliveryRepository.create(createDeliveryDto);
          return this.deliveryRepository.save(newDelivery);
        } else {
          throw new HttpException('Inventory could not be found', HttpStatus.NOT_FOUND);
        }
      } else {
        throw new HttpException('That delivery already exists', HttpStatus.CONFLICT);
      }
    }
  
    async updateDelivery(id: number, quantityMoved: number) {
      let delivery = await this.findDeliveryById(id);
  
      delivery.quantityMoved = quantityMoved;
  
      return this.deliveryRepository.save(delivery);
    }
  
    getDeliveries() {
      return this.deliveryRepository.find();
    }
        
    async findDeliveryById(id: number)  {
      let inventoryBalance = await this.deliveryRepository.findOne({where: { id: id }});
      if (inventoryBalance) {
        return inventoryBalance;
      }
      
      throw new HttpException('That delivery does not exist', HttpStatus.NOT_FOUND);
    }
}
