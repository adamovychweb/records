import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { LoginDto } from '~modules/auth/dto/login.dto';
import { SignupDto } from '~modules/auth/dto/signup.dto';
import { UsersRepository } from '~modules/users/repositories/users.repository';
import { UserEntity } from '~modules/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersRepository: UsersRepository
  ) {}

  async signup({ email, password }: SignupDto): Promise<void> {
    const isEmailUsed = await this._usersRepository.findOne({ email }).then(user => !!user);
    if (isEmailUsed) {
      throw new BadRequestException('This email already used');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await this._usersRepository.create({ email, password: hashedPassword });
  }

  async login({ email, password }: LoginDto): Promise<UserEntity> {
    const user = await this._usersRepository.findOne({ email });
    if (!user) {
      throw new BadRequestException('Wrong email or password');
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new BadRequestException('Wrong email or password');
    }
    return user;
  }
}
