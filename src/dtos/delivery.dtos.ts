import { IsNotEmpty, MinLength, IsInt } from "class-validator";

export class CreateDeliveryDto {
    @IsNotEmpty()
    @MinLength(1)
    name: string;

    @IsNotEmpty()
    @MinLength(1)
    city: string;

    @IsNotEmpty()
    @IsInt()
    quantityMoved: number;
}