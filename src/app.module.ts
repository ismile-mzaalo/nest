import { Module } from '@nestjs/common';
import { UsersModule } from '@app/modules/users/users.module';
import { PostModule } from '@app/modules/post/post.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { validate } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    UsersModule,
    PostModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
