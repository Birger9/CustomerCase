import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWarehouseDto } from 'src/dtos/warehouses.dto';
import { Warehouse } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WarehousesService {
    constructor(
        @InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse>,
      ) {}
          
      async createWarehouse(createWarehouseDto: CreateWarehouseDto) {
        let city = createWarehouseDto.city;
        let warehouse = await this.warehouseRepository.findOne({where: {city: city}});
        
        if (!warehouse) {
          const newWarehouse = this.warehouseRepository.create(createWarehouseDto);
          return this.warehouseRepository.save(newWarehouse);
        }
        
        throw new HttpException('Warehouse already exists', HttpStatus.CONFLICT);
      }
    
      getWarehouses() {
        return this.warehouseRepository.find();
      }
          
      async findWarehousesByCity(city: string): Promise<Warehouse>  {
        let warehouse = await this.warehouseRepository.findOne({where: {city: city}});
        if (warehouse) {
          return warehouse;
        }
        
        throw new HttpException('Warehouse does not exist', HttpStatus.NOT_FOUND);
      }
}
