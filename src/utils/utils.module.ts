import { Global, Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [],
  providers: [JwtStrategy],
  exports: [JwtStrategy],
})
export class UtilsModule {}
