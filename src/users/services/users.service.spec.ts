import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as sinon from 'sinon';
import { Repository } from 'typeorm';
//import { FindOneOptions } from 'typeorm';
import { CreateUserDto, LoginUserDto } from '../dtos/users.dto';
import { User } from '../entities/users.entity';
import { UsersService } from './users.service';

class UsersServiceMock {
  getUserById(id: string) {
    return {};
  }

  createUser(dto: any) {
    return {};
  }

  loginUser(dto: any) {
    return { name: 'john' };
  }

  getAllUsers(id: string, dto: any) {
    return [];
  }

  updateUser(id: string, dto: any) {
    return {};
  }

  deleteUser(id: string) {
    return {};
  }
}

describe.only('UsersService', () => {
  let usersService: UsersService;
  //let sandbox: sinon.SinonSandbox;

  beforeAll(async () => {
    //sandbox = sinon.createSandbox();

    const UsersServiceProvider = {
      provide: UsersService,
      useClass: UsersServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        UsersServiceProvider,
        // {
        //   provide: getRepositoryToken(User),
        //   useValue: sinon.createStubInstance(Repository),
        // },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should call getUserById method with expected param', () => {
    const getUserByIdSpy = jest.spyOn(usersService, 'getUserById');
    //const findOneOptions: FindOneOptions = {};
    let id: string = '1234';
    usersService.getUserById(id);
    let user: any;
    expect(getUserByIdSpy).toHaveBeenCalledWith(id);
    expect(getUserByIdSpy).toHaveReturnedWith(user);
  });

  it('should call createUser method with CreateUserDto', () => {
    const createUserSpy = jest.spyOn(usersService, 'createUser');

    // type cDto = {
    //   name: string;
    // };
    const dto = new CreateUserDto();
    usersService.createUser(dto);
    expect(createUserSpy).toHaveBeenCalledWith(dto);
    expect(createUserSpy).toHaveLastReturnedWith({});
  });

  it('should call loginUser method with LoginUserDto', () => {
    const loginUserSpy = jest.spyOn(usersService, 'loginUser');
    const dto = new LoginUserDto();
    usersService.loginUser(dto);
    //expecting this function should be called with dto type argument
    expect(loginUserSpy).toHaveBeenCalledWith(dto);
    expect(loginUserSpy).toHaveReturnedWith({ name: 'john' });
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
