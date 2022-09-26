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
  Post,
  Put,
  Query,
  Redirect,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users.service';
import { User } from '../entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @Header('Cache-Control', 'none')
  getUsers(@Req() request: Request): string {
    return 'this action return users';
  }

  @Post('create')
  @HttpCode(204)
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
  ) {
    return `this user ${id} is updated`;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {}

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Get('redirect')
  @Redirect('https://docs.nestjs.com', 302) //url and optional statuscode
  getRedirect(@Query('redirect') redirect: string) {
    if (redirect && redirect === 'true') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  // @Get()
  // users() {
  //   return this.userService.fetchusers();
  // }

  //   @Get('posts')
  //   usersPosts() {
  //     return [
  //       {
  //         name: 'john',
  //         email: 'john@email.com',
  //         posts: [
  //           { id: 1, title: 'post1' },
  //           { id: 2, title: 'post2' },
  //         ],
  //       },
  //     ];
  //   }

  // @Post('posts')
  // createUsers(@Req() req:Request ,@Res() res:Response) {
  //   console.log(req.body);
  //   res.send("Created");
  // }
  @Post('create')
  @UsePipes(new ValidationPipe())
  create(@Body() userData: CreateUserDto) {
    console.log(userData);
    return this.userService.createUser(userData);
  }

  // @Get(':id')
  // getUserById(@Param('id',ParseIntPipe) id: string) {
  //   console.log(id);
  //   return { id };
  // }

  // @Get()
  // users (@Query("sort") sort:string){
  //     console.log(sort);
  //     return {sort}
  // }

  //   @Get()
  //   users(@Query('sort', ParseBoolPipe) sort: string) {
  //     console.log(sort);
  //     return { sort };
  //   }
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
