import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from '../dtos/profile.dto';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // create user profile
  // profile/create
  async createProfileService(profileDto: CreateProfileDto, req: any) {
    try {
      //let user = req.user;
      const profile = await this.profileRepository.findOne({
        where: { id: req.user.profileId },
      });

      if (profile) {
        throw new HttpException('profile already exists', HttpStatus.FORBIDDEN);
      }
      const createProfile = await this.profileRepository.save(profileDto);

      if (!createProfile) {
        throw new HttpException(
          'user profile not created',
          HttpStatus.CONFLICT,
        );
      }
      let user = new User();
      user = req.user;
      user.profile = createProfile;

      const userProfile = await this.userRepository.save(user);

      return { userProfile };
    } catch (error) {
      return new BadRequestException('Bad request', error.message);
    }
  }
}
