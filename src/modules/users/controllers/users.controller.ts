import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiHeaders,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';
import { User } from '../entities/users.entity';
import { AuthGuard } from '@nestjs/passport';
import { Any } from 'typeorm';

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
  async createUser(@Body() createuserDto: CreateUserDto) {
    return await this.userService.createUser(createuserDto);
  }

  @Post('/login')
  //@UsePipes(ValidationPipe)
  async loginUser(
    @Body() loginUser: LoginUserDto,
    //@Headers('country') country: string,
  ) {
    //console.log('country', country);
    return await this.userService.loginUser(loginUser);
  }

  @Put('update/:id')
  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuard('jwt'))
  //@UsePipes(ValidationPipe)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getUserById(@Param('id') id: string) {
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
