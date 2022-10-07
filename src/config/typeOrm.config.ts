import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Post } from '../entities/post.entity';
import { User } from '../entities/users.entity';
import { firstMigration1665149835175 } from '../../migrations/1665149835175-firstMigration';
import { secondMigration1665150768775 } from '../../migrations/1665150768775-secondMigration';

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
  migrations: [firstMigration1665149835175, secondMigration1665150768775],
  // cli: {
  //   migrationsDir: 'src/migrations',
  // },
});
