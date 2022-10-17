import { Post } from '../entities/post.entity';
import { User } from '../../users/entities/users.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private repository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  //create post
  async createPost(createPost: CreatePostDto) {
    const { userId } = createPost;

    const user = this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException('user detail not found', HttpStatus.FORBIDDEN);
    }

    const newPost = this.repository.create({
      title: createPost.title,
      description: createPost.description,
      user: await user,
    });

    if (!newPost) {
      throw new HttpException('Try Again', HttpStatus.NOT_IMPLEMENTED);
    } else {
      await this.repository.save(newPost);
      return newPost;
    }
  }

  //get all post
  async getAllPosts(): Promise<Post[]> {
    const posts = this.repository.find();
    if (!posts) {
      throw new HttpException('something went wrong', HttpStatus.FORBIDDEN);
    } else {
      return posts;
    }
  }

  //get post by id
  async getPostById(id: string) {
    if (!id) {
      throw new HttpException('post id required', 400);
    }
    const post = await this.repository.findOne({
      where: { postId: id },
    });
    if (!post) {
      throw new HttpException('post not found', HttpStatus.FORBIDDEN);
    }
    return post;
  }
}
