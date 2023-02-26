import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeliveryDto } from 'src/dtos/delivery.dtos';
import { Delivery } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryService {
    constructor(
        @InjectRepository(Delivery) private readonly deliveryRepository: Repository<Delivery>,
      ) {}
          
    async createDelivery(createDeliveryDto: CreateDeliveryDto) {
      let name = createDeliveryDto.name;
      let city = createDeliveryDto.city;
  
      let inventoryBalance = await this.deliveryRepository.findOne({where: {name: name, city: city}});
      if (!inventoryBalance) {
        const newInventoryBalance = this.deliveryRepository.create(createDeliveryDto);
        return this.deliveryRepository.save(newInventoryBalance);
      }
      
      throw new HttpException('That delivery already exists', HttpStatus.CONFLICT);
    }
  
    async updateDelivery(id: number, quantityMoved: number) {
      let inventoryBalance = await this.findDeliveryById(id);
  
      inventoryBalance.quantityMoved = quantityMoved;
  
      return this.deliveryRepository.save(inventoryBalance);
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
