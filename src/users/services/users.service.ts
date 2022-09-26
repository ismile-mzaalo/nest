import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/users/interfaces/user.interface';

@Injectable()
export class UsersService {
  private fakeUsers = [{ userName: 'john', email: 'example@mail.com' }];

  fetchusers() {
    return this.fakeUsers;
  }

  createUser(userDetails: CreateUserType) {
    this.fakeUsers.push(userDetails);
    return;
  }
}
