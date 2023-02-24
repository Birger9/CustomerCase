import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ email: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log(email, password);
    const employee = await this.authService.validateEmployee(email, password);
    if (!employee) {
      throw new UnauthorizedException();
    }
    return employee;
  }
}