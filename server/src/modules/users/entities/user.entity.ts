import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { UserInterface } from '~modules/users/interfaces/user.interface';

@Entity('users')
export class UserEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  email: string;

  @Column('text')
  password: string;
}
