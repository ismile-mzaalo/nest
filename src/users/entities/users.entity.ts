import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'date', nullable: true })
  dateOfBirth: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;
}
