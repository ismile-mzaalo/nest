import {
  BadRequestException,
  Body,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../dtos/users.dto';
import { comparePassword } from '../../utils/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  //get user by id
  async getUserById(id: string) {
    try {
      if (!id) {
        return new HttpException('id required', 400);
      }
      const user = await this.repository.findOne({
        where: { id },
      });
      if (!user) {
        return new HttpException('user not found', HttpStatus.FORBIDDEN);
      }
      return user;
    } catch {
      return new BadRequestException('Bad Request');
    }
  }

  //create new user
  async createUser(createUserDto: CreateUserDto) {
    try {
      let { email } = createUserDto;

      let userExists = await this.repository.findOne({ where: { email } });

      if (userExists) {
        return new HttpException('email already exists', 404);
      }

      const newUser = await this.repository.save(
        this.repository.create(createUserDto),
      );

      if (!newUser) {
        return new HttpException('user not created', HttpStatus.BAD_REQUEST);
      }

      const payload = {
        id: newUser.id,
        isAdmin: newUser.isAdmin,
        email: newUser.email,
      };

      const token = this.jwtService.sign(payload);

      return {
        id: newUser.id,
        userName: newUser.userName,
        email: newUser.email,
        password: newUser.password,
        token,
      };
    } catch (error) {
      return new BadRequestException('Error creating user', error.message);
    }
  }

  // login user
  async loginUser(loginUser: LoginUserDto) {
    try {
      const user = await this.repository.findOne({
        where: { email: loginUser.email },
      });

      if (!user) {
        throw new BadRequestException('incorrect email');
      }

      const matchedPassword = comparePassword(
        loginUser.password,
        user.password,
      );

      if (!matchedPassword) {
        return new HttpException('Incorret password', HttpStatus.FORBIDDEN);
      }
      if (user && matchedPassword) {
        const payload = {
          id: user.id,
          isAdmin: user.isAdmin,
          email: user.email,
        };

        const token = this.jwtService.sign(payload);

        return { ...user, token };
      } else {
        return new HttpException('invalid data', HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      return new HttpException('try try', error.message);
    }
  }

  //get all users
  async getAllUsers(): Promise<User[]> {
    return this.repository.find();
  }

  //update user
  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.repository.findOne({ where: { id } });

      if (!user) {
        return new HttpException('user not found', 404);
      }
      // const matchedPassword = comparePassword(
      //   updateUserDto.password,
      //   user.password,
      // );
      // if (user) {
      //   user.userName = updateUserDto.userName || user.userName;
      //   user.email = updateUserDto.email || user.email;
      //   user.password = updateUserDto.password || user.password;
      //   user.isAdmin = updateUserDto.isAdmin || user.isAdmin;
      // }

      let updateUser = await this.repository.update(id, updateUserDto);

      if (!updateUser) {
        return new HttpException('user not updated', HttpStatus.FORBIDDEN);
      }

      let updatedUser = await this.repository.findOne({ where: { id } });

      const payload = {
        id: updatedUser.id,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      };

      const token = this.jwtService.sign(payload);

      return { updatedUser, token };
    } catch {
      return new BadRequestException('Bad Request');
    }
  }

  //delete user
  async deleteUser(id: string, req: any) {
    try {
      let user = req.user;
      if (id === user.id) {
        const deleteUser = this.repository.delete(id);

        if (deleteUser) return { message: 'User deleted' };
      } else {
        throw new HttpException(
          'user not found or matched',
          HttpStatus.FORBIDDEN,
        );
      }
    } catch {
      throw new BadRequestException('Bad Request');
    }
  }
}
