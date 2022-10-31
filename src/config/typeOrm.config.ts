import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/users/entities/users.entity';
import { Post1665730347672 } from '../../migrations/1665730347672-Post';
import { updatePost1666863339658 } from '../../migrations/1666863339658-updatePost';
import { CreateProfile1667035835079 } from '../../migrations/1667035835079-CreateProfile';
import { profileId1667207412207 } from '../../migrations/1667207412207-profileId';
import { Profile } from 'src/profile/entities/profile.entity';

const configService = new ConfigService();
config();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT') || 3000,
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DATABASE'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [
    Post1665730347672,
    updatePost1666863339658,
    CreateProfile1667035835079,
    profileId1667207412207,
  ],
});
