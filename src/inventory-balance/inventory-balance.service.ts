import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInventoryBalanceDto } from 'src/dtos/inventory-balance.dto';
import { Employee, InventoryBalance } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryBalanceService {
    constructor(
        @InjectRepository(InventoryBalance) private readonly inventoryBalanceRepository: Repository<InventoryBalance>,
      ) {}
          
      async createInventoryBalance(createInventoryBalanceDto: CreateInventoryBalanceDto) {
        let productNumber = createInventoryBalanceDto.productNumber;
        let city = createInventoryBalanceDto.city;

        let inventoryBalance = await this.inventoryBalanceRepository.findOne({where: {productNumber: productNumber, city: city}});
        if (!inventoryBalance) {
          const newInventoryBalance = this.inventoryBalanceRepository.create(createInventoryBalanceDto);
          return this.inventoryBalanceRepository.save(newInventoryBalance);
        }
        
        throw new HttpException('That inventory already exists', HttpStatus.CONFLICT);
      }

      async updateInventoryBalance(productNumber: string, city: string, quantityMoved: number) {
        let inventoryBalance = await this.findInventoryBalanceByProductNumberAndCity(productNumber, city);

        let newbalance = inventoryBalance.balance + quantityMoved;
        inventoryBalance.balance = newbalance;

        return this.inventoryBalanceRepository.save(inventoryBalance);
      }
    
      getInventoryBalances() {
        return this.inventoryBalanceRepository.find();
      }
          
      async findInventoryBalanceByProductNumberAndCity(productNumber: string, city: string)  {
        let inventoryBalance = await this.inventoryBalanceRepository.findOne({where: {productNumber: productNumber, city: city}});
        if (inventoryBalance) {
          return inventoryBalance;
        }
        
        throw new HttpException('Warehouse or product does not exist', HttpStatus.NOT_FOUND);
      }
}
