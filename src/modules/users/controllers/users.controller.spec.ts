import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            loginUser: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('usersService should be define', () => {
    expect(usersService).toBeDefined();
  });

  //loginUser
  const loginUser = {
    email: 'one@email.com',
    password: '123456',
  };
  describe('loginUser', () => {
    it('should call a userService loginUser', async () => {
      jest.spyOn(usersService, 'loginUser').mockImplementationOnce(() => {
        throw new HttpException('try try', 401);
      });
      try {
        const user = await usersController.loginUser(loginUser);
      } catch (err) {
        console.log(err);
      }
    });
  });

  // describe('loginUser', () => {
  //   it('should retrieve user data form Users repository', async () => {
  //     usersService.loginUser(loginUser);
  //     expect();
  //   });
  // });
});
