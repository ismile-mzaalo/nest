import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { UsersModule } from './modules/users/users.module';
import { PostModule } from './modules/post/post.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { validate } from './config/env.validation';
import { UtilsModule } from './utils/utils.module';
import { SetcountryinheaderMiddleware } from './middlewares/setcountryinheader.middleware';
import { UsersController } from './modules/users/controllers/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),

    UsersModule,
    PostModule,
    DatabaseModule,
    UtilsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
