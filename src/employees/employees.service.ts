import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Employee } from 'src/typeorm';
import { CreateEmployeeDto } from 'src/dtos/employees.dtos';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>,
      ) {}
          
      async createEmployee(createEmployeeDto: CreateEmployeeDto) {
        let email = createEmployeeDto.email;
        let employee = await this.employeeRepository.findOne({where: {email: email}});
        if (!employee) {
          const newEmployee = this.employeeRepository.create(createEmployeeDto);
          return this.employeeRepository.save(newEmployee);
        }
        
        throw new HttpException('Employee already exists', HttpStatus.CONFLICT);
      }

      getEmployees() {
        return this.employeeRepository.find();
      }
          
      async findEmployeesByEmail(email: string): Promise<Employee>  {
        let employee = await this.employeeRepository.findOne({where: {email: email}});
        if (employee) {
          delete employee.password
          return employee;
        }
        
        throw new HttpException('Employee does not exist', HttpStatus.NOT_FOUND);
      }
}
