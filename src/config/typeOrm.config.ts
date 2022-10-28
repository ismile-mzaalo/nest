import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Post } from '../post/entities/post.entity';
import { User } from '../users/entities/users.entity';
import { Post1665730347672 } from '../../migrations/1665730347672-Post';
import { updatePost1666863339658 } from '../../migrations/1666863339658-updatePost';

const configService = new ConfigService();
config();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT') || 3000,
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DATABASE'),
  entities: [Post, User],
  synchronize: false,
  migrations: [Post1665730347672, updatePost1666863339658],
});
