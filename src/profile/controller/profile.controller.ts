import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProfileDto } from '../dtos/profile.dto';
import { ProfileService } from '../services/profile.service';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post('create')
  @ApiBearerAuth('Authorization')
  @UseGuards(AuthGuard('jwt'))
  async createProfile(@Body() profile: CreateProfileDto, @Req() req: any) {
    return await this.profileService.createProfileService(profile, req);
  }
}
