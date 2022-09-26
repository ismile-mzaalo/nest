import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('auth middleware');
    const { authorization } = req.headers;
    if (!authorization)
      throw new HttpException('no auth', HttpStatus.FORBIDDEN);
    if (authorization === 'amamamamamam') next();
    else throw new HttpException('no auth', HttpStatus.FORBIDDEN);
  }
}
