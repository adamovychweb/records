import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '~modules/users/entities/user.entity';
import { UserInterface } from '~modules/users/interfaces/user.interface';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _usersRepository: Repository<UserEntity>
  ) {}

  async create({ email, password }: Pick<UserInterface, 'email' | 'password'>): Promise<UserEntity> {
    try {
      const user = this._usersRepository.create({ email, password });
      await this._usersRepository.save(user);
      return user;
    } catch {
      throw new InternalServerErrorException('An error occurred while creating new user');
    }
  }

  async findOne(findQuery: Partial<UserInterface>): Promise<UserEntity | null> {
    try {
      const user = await this._usersRepository.findOne({ where: findQuery });
      if (!user) {
        return null;
      }
      return user;
    } catch {
      throw new InternalServerErrorException('An error occurred while finding user');
    }
  }
}
