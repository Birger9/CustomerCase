import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { HasRights } from 'src/auth/has-rights.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RightsGuard } from 'src/auth/rights.guard';

import { CreateProductDto } from 'src/dtos/products.dtos';
import { Rights } from 'src/enums/rights.enum';
import { Product } from 'src/typeorm';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
  
    @HasRights(Rights.Employee)
    @UseGuards(JwtAuthGuard, RightsGuard)
    @Get()
    getProducts() {
        return this.productsService.getProducts();
    }

    @HasRights(Rights.Employee)
    @UseGuards(JwtAuthGuard, RightsGuard)
    @Get('productnumber/:productnumber')
    findProductsByProductNumber(@Param('productnumber') productNumber: string): Promise<Product> {
        return this.productsService.findProductsByProductNumber(productNumber);
    }

    @HasRights(Rights.Manager)
    @UseGuards(JwtAuthGuard, RightsGuard)
    @Post('create')
    @UsePipes(ValidationPipe)
    createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productsService.createProduct(createProductDto);
    }
}
