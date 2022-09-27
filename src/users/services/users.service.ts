import { Body, Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/users/interfaces/user.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { UUIDVersion } from 'class-validator';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  async getUserById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.userName = createUserDto.userName;
    user.email = createUserDto.email;

    return this.repository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.repository.find();
  }

  async updateUser(id: string, updateUserDto: CreateUserDto) {
    const user: User = new User();

    user.userName = updateUserDto.userName;
    user.email = updateUserDto.email;
    user.id = id;

    return this.repository.save(user);
  }

  async deleteUser(id: string) {
    return this.repository.delete(id);
  }
}
