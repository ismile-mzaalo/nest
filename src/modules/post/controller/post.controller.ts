import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from '../dtos/post.dto';
import { PostService } from '../service/post.service';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async getAllPost() {
    return this.postService.getAllPosts();
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createPost(@Body() createPost: CreatePostDto) {
    return await this.postService.createPost(createPost);
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }
}
