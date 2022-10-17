import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class SetcountryinheaderMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    next();
  }
}
