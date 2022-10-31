import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { validate } from './config/env.validation';
import { UtilsModule } from './utils/utils.module';
import { SetcountryinheaderMiddleware } from './middlewares/setcountryinheader.middleware';
import { UsersController } from './users/controllers/users.controller';
import { ProfileModule } from './profile/profile.module';

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
    ProfileModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
