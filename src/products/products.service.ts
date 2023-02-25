import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dtos/product.dtos';
import { Product } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
      ) {}
          
      async createProduct(createProductDto: CreateProductDto) {
        let productNumber = createProductDto.productNumber;
        let product = await this.productRepository.findOne({where: {productNumber: productNumber}});
        
        if (!product) {
          const newProduct = this.productRepository.create(createProductDto);
          return this.productRepository.save(newProduct);
        }
        
        throw new HttpException('Product already exists', HttpStatus.CONFLICT);
      }
  
      getProducts() {
        return this.productRepository.find();
      }
          
      async findProductsByProductNumber(productNumber: string): Promise<Product>  {
        let product = await this.productRepository.findOne({where: {productNumber: productNumber}});
        if (product) {
          return product;
        }
        
        throw new HttpException('Product does not exist', HttpStatus.NOT_FOUND);
      }
}
