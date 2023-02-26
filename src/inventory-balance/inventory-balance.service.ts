import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInventoryBalanceDto } from 'src/dtos/inventory-balance.dtos';
import {  InventoryBalance } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryBalanceService {
  constructor(
      @InjectRepository(InventoryBalance) private readonly inventoryBalanceRepository: Repository<InventoryBalance>,
    ) {}
        
  async createInventoryBalance(createInventoryBalanceDto: CreateInventoryBalanceDto) {
    let name = createInventoryBalanceDto.name;
    let city = createInventoryBalanceDto.city;

    let inventoryBalance = await this.inventoryBalanceRepository.findOne({where: {name: name, city: city}});
    if (!inventoryBalance) {
      const newInventoryBalance = this.inventoryBalanceRepository.create(createInventoryBalanceDto);
      return this.inventoryBalanceRepository.save(newInventoryBalance);
    }
    
    throw new HttpException('That inventory already exists', HttpStatus.CONFLICT);
  }

  async updateInventoryBalance(id: number, quantityMoved: string) {
    let inventoryBalance = await this.findInventoryBalanceById(id);

    let newbalance = inventoryBalance.balance + parseInt(quantityMoved);
    inventoryBalance.balance = newbalance;

    return this.inventoryBalanceRepository.save(inventoryBalance);
  }

  getInventoryBalances() {
    return this.inventoryBalanceRepository.find();
  }
      
  async findInventoryBalanceById(id: number)  {
    let inventoryBalance = await this.inventoryBalanceRepository.findOne({where: { id: id }});
    if (inventoryBalance) {
      return inventoryBalance;
    }
    
    throw new HttpException('Warehouse or product does not exist', HttpStatus.NOT_FOUND);
  }
}
