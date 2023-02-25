import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateEmployeeDto } from 'src/dtos/employees.dtos';
import { Employee } from 'src/typeorm';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {}
  
    @Get()
    getEmployees() {
        return this.employeesService.getEmployees();
    }

    @Get('email/:email')
    findEmployeesByEmail(@Param('email') email: string): Promise<Employee> {
        return this.employeesService.findEmployeesByEmail(email);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createEmployees(@Body() createEmployeeDto: CreateEmployeeDto) {
        return this.employeesService.createEmployee(createEmployeeDto);
    }
}
