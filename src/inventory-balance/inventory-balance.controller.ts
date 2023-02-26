import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { HasRights } from 'src/auth/has-rights.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RightsGuard } from 'src/auth/rights.guard';
import { CreateInventoryBalanceDto } from 'src/dtos/inventory-balance.dtos';
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
    @Get('id/:id')
    findInventoryBalanceByProductNumberAndCity(@Param('id') id: number): Promise<InventoryBalance> {
        return this.inventoryBalanceService.findInventoryBalanceByProductNumberAndCity(id);
    }

    @HasRights(Rights.Manager)
    @UseGuards(JwtAuthGuard, RightsGuard)
    @Get('id/:id/quantity/:quantity')
    updateInventoryBalance(@Param('id') id: number, @Param('quantity') quantity: string): Promise<InventoryBalance> {
        return this.inventoryBalanceService.updateInventoryBalance(id, quantity);
    }

    @HasRights(Rights.Manager)
    @UseGuards(JwtAuthGuard, RightsGuard)
    @Post('create')
    @UsePipes(ValidationPipe)
    createInventoryBalance(@Body() createInventoryBalanceDto: CreateInventoryBalanceDto) {
        return this.inventoryBalanceService.createInventoryBalance(createInventoryBalanceDto);
    }
}
