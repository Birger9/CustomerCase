import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Rights } from 'src/enums/rights.enum';

@Injectable()
export class RightsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRight = this.reflector.getAllAndOverride<Rights[]>('rights', [
      context.getHandler(),
      context.getClass(),
    ])[0];

    if (!requiredRight) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    if(user.rights >= requiredRight) {
      return true;
    }
    return false;
  }
}