import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { JwtStrategy } from 'src/utils/jwt.strategy';
import { ProfileController } from './controller/profile.controller';
import { Profile } from './entities/profile.entity';
import { ProfileService } from './services/profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User])],
  controllers: [ProfileController],
  providers: [ProfileService, JwtStrategy],
})
export class ProfileModule {}
