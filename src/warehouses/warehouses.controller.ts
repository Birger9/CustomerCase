import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

// Own files.
import { HasRights } from 'src/auth/has-rights.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RightsGuard } from 'src/auth/rights.guard';
import { CreateWarehouseDto } from 'src/dtos/warehouses.dto';
import { Rights } from 'src/enums/rights.enum';
import { Warehouse } from 'src/typeorm';
import { WarehousesService } from './warehouses.service';

@Controller('warehouses')
export class WarehousesController {
    constructor(private readonly WarehousesService: WarehousesService) {}
  
    @HasRights(Rights.Employee)
    @UseGuards(JwtAuthGuard, RightsGuard)
    @Get()
    getWarehouses() {
        return this.WarehousesService.getWarehouses();
    }

    @HasRights(Rights.Employee)
    @UseGuards(JwtAuthGuard, RightsGuard)
    @Get('city/:city')
    findWarehousesByCity(@Param('city') city: string): Promise<Warehouse> {
        return this.WarehousesService.findWarehousesByCity(city);
    }

    @HasRights(Rights.Manager)
    @UseGuards(JwtAuthGuard, RightsGuard)
    @Post('create')
    @UsePipes(ValidationPipe)
    createWarehouse(@Body() createWarehouseDto: CreateWarehouseDto) {
        return this.WarehousesService.createWarehouse(createWarehouseDto);
    }
}
