import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { HasRights } from './has-rights.decorator';
import { Rights } from 'src/enums/rights.enum';
import { RightsGuard } from './rights.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @HasRights(Rights.Admin)
  @UseGuards(JwtAuthGuard, RightsGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}