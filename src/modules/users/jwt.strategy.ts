import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from './services/users.service';
require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.getUserById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
