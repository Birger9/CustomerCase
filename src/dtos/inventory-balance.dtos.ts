import { IsNotEmpty, MinLength, IsInt, Min } from "class-validator";

export class CreateInventoryBalanceDto {
    @IsNotEmpty()
    @MinLength(1)
    name: string;

    @IsNotEmpty()
    @MinLength(1)
    city: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    balance: number;
}