import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/users.entity';
import { CreateUserDto, LoginUserDto } from '../dtos/users.dto';
import { comparePassword, encodePassword } from '../../../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  //get user by id
  async getUserById(id: string): Promise<User> {
    if (!id) {
      throw new HttpException('id required', 400);
    }
    const user = await this.repository.findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  //create new user
  async createUser(createUserDto: CreateUserDto) {
    let { email } = createUserDto;

    let userExists = await this.repository.findOne({ where: { email } });

    if (userExists) {
      throw new HttpException('email already exists', 404);
    }

    const password = encodePassword(createUserDto.password);

    const newUser = this.repository.save({
      ...createUserDto,
      password,
    });

    return newUser;
  }

  // login user
  async loginUser(loginUser: LoginUserDto) {
    const user = await this.repository.findOne({
      where: { email: loginUser.email },
    });

    if (!user) {
      throw new HttpException('user not exist', HttpStatus.NOT_FOUND);
    }

    const matchedPassword = comparePassword(loginUser.password, user.password);

    if (!matchedPassword) {
      throw new HttpException('Incorrect password', 401);
    }
    return user;
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
