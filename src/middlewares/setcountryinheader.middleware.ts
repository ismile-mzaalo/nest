import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SetcountryinheaderMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('middd');
    try {
      if (req.headers.country) {
        next();
      } else {
        req.headers.country = 'IN';

        return next();
      }
    } catch (err) {
      req.headers.country = 'IN';
      return next();
    }
  }
}
