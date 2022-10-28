import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  @UseGuards(AuthGuard('jwt'))
  //@UsePipes(ValidationPipe)
  async createPost(@Body() createPost: CreatePostDto, @Req() req: any) {
    console.log('ttt', req.user.id);
    return await this.postService.createPost(createPost, req);
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }
}
