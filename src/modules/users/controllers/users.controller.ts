import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from '@app/modules/users/dtos/users.dto';
import { UsersService } from '@app/modules/users/services/users.service';
import { User } from '../../../entities/users.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'User Registration success',
  })
  async createUser(@Body() createuserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createuserDto);
  }

  @Get('/login')
  @UsePipes(ValidationPipe)
  async loginUser(@Body() loginUser: LoginUserDto): Promise<User> {
    return await this.userService.loginUser(loginUser);
  }

  @Put('update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.updateUser(id, createUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }
}

// Request Object below :-
// @Request(), @Req()	req
// @Response(), @Res()*	res
// @Next()	next
// @Session()	req.session
// @Param(key?: string)	req.params / req.params[key]
// @Body(key?: string)	req.body / req.body[key]
// @Query(key?: string)	req.query / req.query[key]
// @Headers(name?: string)	req.headers / req.headers[name]
// @Ip()	req.ip
// @HostParam()	req.hosts

//HTTP methods: @Get(), @Post(), @Put(), @Delete(), @Patch(), @Options(), and @Head().
//In addition, @All() defines an endpoint that handles all of them.
