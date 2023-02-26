import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { HasRights } from 'src/auth/has-rights.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RightsGuard } from 'src/auth/rights.guard';
import { CreateInventoryBalanceDto } from 'src/dtos/inventory-balance.dto';
import { Rights } from 'src/enums/rights.enum';
import { InventoryBalance } from 'src/typeorm';
import { InventoryBalanceService } from './inventory-balance.service';

@Controller('inventory-balance')
export class InventoryBalanceController {
    constructor(private readonly inventoryBalanceService: InventoryBalanceService) {}
    
    @HasRights(Rights.Employee)
    @UseGuards(JwtAuthGuard, RightsGuard)
    @Get()
    getInventoryBalances() {
        return this.inventoryBalanceService.getInventoryBalances();
    }

    @HasRights(Rights.Employee)
    @UseGuards(JwtAuthGuard, RightsGuard)
    @Get('productnumber/:productnumber/city/:city')
    findInventoryBalanceByProductNumberAndCity(@Param('productnumber') productnumber: string, @Param('city') city: string): Promise<InventoryBalance> {
        return this.inventoryBalanceService.findInventoryBalanceByProductNumberAndCity(productnumber, city);
    }

    @HasRights(Rights.Manager)
    @UseGuards(JwtAuthGuard, RightsGuard)
    @Post('create')
    @UsePipes(ValidationPipe)
    createInventoryBalance(@Body() createInventoryBalanceDto: CreateInventoryBalanceDto) {
        return this.inventoryBalanceService.createInventoryBalance(createInventoryBalanceDto);
    }
}
