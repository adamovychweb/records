import { ReadableUserInterface } from '~modules/users/interfaces/readable-user.interface';
import { UserEntity } from '~modules/users/entities/user.entity';

export class ReadableUserSerializer implements ReadableUserInterface {
  email: string;

  constructor(user: UserEntity) {
    this.email = user.email;
  }
}
