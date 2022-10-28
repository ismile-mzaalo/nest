import { Module } from '@nestjs/common';
import { ProfileController } from './controller/profile.controller';
import { ProfileService } from './services/profile.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
