import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  AfterLoad,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Post } from '../../post/entities/post.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { Profile } from '../../profile/entities/profile.entity';

//Feature from TypeORM
// An auto generated uuid id-field and/or a createDateTime-, lastChangedDateTime-fields

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid') //uuid v4 -default
  id: string;

  @Column({ type: 'varchar' })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @OneToMany(() => Post, (post: Post) => post.user)
  posts: Post[];

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = bcrypt.hashSync(this.password, 10);
    } catch (e) {
      console.log('error', e);
      throw new HttpException('password not hashed', HttpStatus.FORBIDDEN);
    }
  }
}
