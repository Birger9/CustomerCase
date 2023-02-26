import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { HasRights } from 'src/auth/has-rights.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RightsGuard } from 'src/auth/rights.guard';
import { CreateDeliveryDto } from 'src/dtos/delivery.dtos';
import { Rights } from 'src/enums/rights.enum';
import { Delivery } from 'src/typeorm';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
    constructor(private readonly deliveryService: DeliveryService) {}
    
    @HasRights(Rights.Employee)
    @UseGuards(JwtAuthGuard, RightsGuard)
    @Get()
    getDeliveries() {
        return this.deliveryService.getDeliveries();
    }

    @HasRights(Rights.Employee)
    @UseGuards(JwtAuthGuard, RightsGuard)
    @Get('id/:id')
    findDeliveryById(@Param('id') id: number): Promise<Delivery> {
        return this.deliveryService.findDeliveryById(id);
    }

    @HasRights(Rights.Manager)
    @UseGuards(JwtAuthGuard, RightsGuard)
    @Get('id/:id/quantity/:quantity')
    updateDelivery(@Param('id') id: number, @Param('quantity') quantity: number): Promise<Delivery> {
        return this.deliveryService.updateDelivery(id, quantity);
    }

    @HasRights(Rights.Manager)
    @UseGuards(JwtAuthGuard, RightsGuard)
    @Post('create')
    @UsePipes(ValidationPipe)
    createDelivery(@Body() createDeliveryDto: CreateDeliveryDto) {
        return this.deliveryService.createDelivery(createDeliveryDto);
    }
}
