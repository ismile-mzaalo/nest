import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostController } from './controller/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@app/entities/post.entity';
import { User } from '@app/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
