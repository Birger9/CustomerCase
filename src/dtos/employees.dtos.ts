import { IsEmail, IsNotEmpty, MinLength, IsInt, Min, Max } from "class-validator";
import { Rights } from "src/enums/rights.enum";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(2)
  rights: Rights;
}