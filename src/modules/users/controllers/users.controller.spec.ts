import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';

describe('UsersController Unit Tests', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeAll(async () => {
    const UsersServiceProvider = {
      provide: UsersService,
      useFactory: () => ({
        getAllUsers: jest.fn(() => []),
        createUser: jest.fn(() => {}),
        loginUser: jest.fn(() => {}),
        updateUser: jest.fn(() => {}),
        deleteUser: jest.fn(() => {}),
        getUserById: jest.fn(() => {}),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, UsersServiceProvider],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('calling getUsers method', () => {
    usersController.getUsers();
    expect(usersService.getAllUsers).toHaveBeenCalled();
  });

  it('calling createUser method', () => {
    const dto = new CreateUserDto();
    usersController.createUser(dto);
    expect(usersService.createUser).toHaveBeenCalled();
    expect(usersService.createUser).toHaveBeenCalledWith(dto);
  });

  it('calling loginUser method', () => {
    const dto = new LoginUserDto();
    usersController.loginUser(dto);
    expect(usersService.loginUser).toHaveBeenCalled();
    expect(usersService.loginUser).toHaveBeenCalledWith(dto);
  });

  it('calling updateUser method', () => {
    const dto = new UpdateUserDto();
    let id: string;
    usersController.updateUser(id, dto);
    expect(usersService.updateUser).toHaveBeenCalled();
    expect(usersService.updateUser).toHaveBeenCalledWith(id, dto);
  });

  // it('calling')

  // it('should be defined', () => {
  //   expect(usersController).toBeDefined();
  // });

  // it('usersService should be define', () => {
  //   expect(usersService).toBeDefined();
  // });

  //loginUser
  // const loginUser = {
  //   email: 'one@email.com',
  //   password: '123456',
  // };
  // describe('loginUser', () => {
  //   it('should call a userService loginUser', async () => {
  //     jest.spyOn(usersService, 'loginUser').mockImplementationOnce(() => {
  //       throw new HttpException('try try', 401);
  //     });
  //     try {
  //       const user = await usersController.loginUser(loginUser);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   });
  // });

  // describe('loginUser', () => {
  //   it('should retrieve user data form Users repository', async () => {
  //     usersService.loginUser(loginUser);
  //     expect();
  //   });
  // });
});
