import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  profileId: string;

  @Column({ type: 'varchar' })
  country: string;

  @Column({ type: 'varchar' })
  gender: string;

  @Column('string', { array: true })
  hobby: string[];
}
