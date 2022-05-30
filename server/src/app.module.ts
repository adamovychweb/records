import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ApiConfigModule } from '~modules/api-config/api-config.module';
import { UsersModule } from '~modules/users/users.module';
import { AuthModule } from '~modules/auth/auth.module';
import { JwtTokensModule } from '~modules/jwt-tokens/jwt-tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    ApiConfigModule,
    UsersModule,
    AuthModule,
    JwtTokensModule
  ]
})
export class AppModule {}
