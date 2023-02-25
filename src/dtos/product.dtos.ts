import { IsNotEmpty, MinLength, IsInt, Min } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(1)
  productNumber: string;

  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  price: number;
}