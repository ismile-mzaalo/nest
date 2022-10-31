import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostController } from './controller/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/users.entity';
import { JwtStrategy } from 'src/utils/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  providers: [PostService,JwtStrategy],
  controllers: [PostController],
})
export class PostModule {}
