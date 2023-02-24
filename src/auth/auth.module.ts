import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from './local.strategy';
import { EmployeesModule } from 'src/employees/employees.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [EmployeesModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
