import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ScanMiddleware } from '../middlewares/scan.middleware';
import { UsersService } from './services/users.service';
import { User } from './entities/users.entity';
import { Post } from '../post/entities/post.entity';
import { JwtStrategy } from '../utils/jwt.strategy';
import { SetcountryinheaderMiddleware } from 'src/middlewares/setcountryinheader.middleware';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post]),
    //configuring strategy and jwt
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SetcountryinheaderMiddleware).forRoutes(UsersController);
  }
}
// export class UsersModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .exclude(
//         { path: 'users/create', method: RequestMethod.POST },
//         { path: 'users/login', method: RequestMethod.GET },
//       )
//       .forRoutes(UsersController);

//     // .apply(ScanMiddleware)
//     // .forRoutes({
//     //   path: 'users/create',
//     //   method: RequestMethod.POST,
//     // });
//   }
// }
