import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { CreateUserType } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  //get user by id
  async getUserById(id: string): Promise<User> {
    if (!id) {
      throw new HttpException('id required', 400);
    }
    const user = await this.repository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  //create new user
  async createUser(createUserDto: CreateUserType) {
    let { email } = createUserDto;

    let userExists = await this.repository.findOne({ where: { email } });

    if (userExists) {
      throw new HttpException('email already exists', 404);
    }

    const user: User = new User();

    user.userName = createUserDto.userName;
    user.email = createUserDto.email;
    const newUser = await this.repository.save(user);

    return newUser;
  }

  //get all users
  async getAllUsers(): Promise<User[]> {
    return this.repository.find();
  }

  //update user
  async updateUser(id: string, updateUserDto: CreateUserDto) {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('user not found', 404);
    }

    const updateUser: User = new User();

    updateUser.userName = updateUserDto.userName || user.userName;
    updateUser.email = updateUserDto.email || user.email;
    updateUser.isAdmin = updateUserDto.isAdmin || user.isAdmin;
    updateUser.id = id;

    return this.repository.save(updateUser);
  }

  //delete user
  async deleteUser(id: string) {
    if (id) {
      const deleteUser = this.repository.delete(id);
      if (deleteUser) return 'User Removed';
    } else {
      throw new HttpException('bad request', HttpStatus.FORBIDDEN);
    }
  }
}
