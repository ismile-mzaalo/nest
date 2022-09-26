import { Body, Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/users/interfaces/user.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { CreateUserDto } from '../dtos/CreateUser.dto';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  async getUserById(id: number): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });
    return user;
  }

  async createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();

    
    user.userName = body.userName;
    user.email = body.email;

    const newUser = await this.repository.save(user);

    return newUser;
  }
}
