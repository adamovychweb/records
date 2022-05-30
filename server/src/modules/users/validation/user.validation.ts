import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { UserInterface } from '~modules/users/interfaces/user.interface';

export class UserValidation implements UserInterface {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
