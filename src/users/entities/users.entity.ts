import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//Feature from TypeORM
// An auto generated uuid id-field and/or a createDateTime-, lastChangedDateTime-fields

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  userName: string;

  @Column({ unique: true })
  email: String;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;
}
