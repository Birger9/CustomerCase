import { IsNotEmpty, MinLength, IsInt, Min } from "class-validator";

export class CreateDeliveryDto {
    @IsNotEmpty()
    @MinLength(1)
    productNumber: string;

    @IsNotEmpty()
    @MinLength(1)
    city: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    quantityMoved: number;
}