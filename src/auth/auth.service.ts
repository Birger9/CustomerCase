import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class AuthService {
    constructor(private employeesService: EmployeesService) {}

    async validateEmployee(email: string, password: string): Promise<any> {
        const employee = await this.employeesService.findEmployeesByEmail(email);

        if (employee) {
            if (password == employee.password) {
                delete employee.password;
                return employee;
            }
        }
        return null;
    }
}
