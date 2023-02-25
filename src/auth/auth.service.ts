import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class AuthService {
    constructor(
        private employeesService: EmployeesService,
        private jwtService: JwtService
    ) {}

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

    async login(employee: any) {
        const payload = { username: employee.email, sub: employee.rights };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }
}
