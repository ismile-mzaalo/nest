import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '../users/controllers/users.controller';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { ScanMiddleware } from '../../middlewares/scan.middleware';
import { UsersService } from './services/users.service';
import { User } from '../../entities/users.entity';
import { Post } from '../../entities/post.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'users', method: RequestMethod.POST })
      .forRoutes(UsersController)

      .apply(ScanMiddleware)
      .forRoutes({
        path: 'users/create',
        method: RequestMethod.POST,
      });
  }
}