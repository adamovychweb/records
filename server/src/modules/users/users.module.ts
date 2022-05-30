import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '~modules/users/entities/user.entity';
import { UsersRepository } from '~modules/users/repositories/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersRepository],
  exports: [UsersRepository]
})
export class UsersModule {}
