import { IsNotEmpty, MinLength } from "class-validator";

export class CreateWarehouseDto {
  @IsNotEmpty()
  @MinLength(1)
  city: string;
}