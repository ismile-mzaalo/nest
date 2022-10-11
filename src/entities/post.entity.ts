import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @ManyToOne(() => User, (user: User) => user.posts)
  user: User;
}
