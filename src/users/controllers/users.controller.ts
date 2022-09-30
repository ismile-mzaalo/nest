import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Redirect,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users.service';
import { User } from '../entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @Header('Cache-Control', 'none')
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Post('create')
  async createUser(@Body() createuserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createuserDto);
  }

  @Put('update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.updateUser(id, createUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  // @Get('redirect')
  // @Redirect('https://docs.nestjs.com', 302) //url and optional statuscode
  // getRedirect(@Query('redirect') redirect: string) {
  //   if (redirect && redirect === 'true') {
  //     return { url: 'https://docs.nestjs.com/v5/' };
  //   }
  // }

  // @Post('posts')
  // createUsers(@Req() req:Request ,@Res() res:Response) {
  //   console.log(req.body);
  //   res.send("Created");
  // }

  // @Post('create')
  // @UsePipes(new ValidationPipe())
  // create(@Body() userData: CreateUserDto) {
  //   console.log(userData);
  //   return this.userService.createUser(userData);
  // }
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
