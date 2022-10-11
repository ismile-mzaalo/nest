import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Post } from '../entities/post.entity';
import { User } from '../entities/users.entity';
import { firstMigration1665392640227 } from '../../migrations/1665392640227-firstMigration';
import { secondMigration1665393754954 } from '../../migrations/1665393754954-secondMigration';
import { tagsColumnRemoved1665394220299 } from '../../migrations/1665394220299-tagsColumnRemoved';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: parseInt(configService.get('POSTGRES_PORT')) || 3000,
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DATABASE'),
  entities: [Post, User],
  synchronize: false,
  migrations: [
    firstMigration1665392640227,
    secondMigration1665393754954,
    tagsColumnRemoved1665394220299,
  ],
});
