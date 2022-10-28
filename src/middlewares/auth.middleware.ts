import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
      try {
        let token: string = req.headers.authorization;

        const jwtSecret = await this.config.get('JWT_SECRET');

        console.log('jwttttt', jwtSecret);

        const decoded = await this.jwt.verify(token, jwtSecret);

        console.log('jwt tokennn', decoded);

        req.user = await this.userRepository.findOneBy(decoded.id);

        next();
      } catch (error) {
        console.error(error);
        throw new HttpException(
          'Not Authorized,token failed',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException('No Token Found', HttpStatus.UNAUTHORIZED);
    }
  }
}
