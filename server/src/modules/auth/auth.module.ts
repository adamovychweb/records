import { Module } from '@nestjs/common';

import { AuthService } from '~modules/auth/services/auth.service';
import { AuthController } from '~modules/auth/controllers/auth.controller';
import { UsersModule } from '~modules/users/users.module';
import { JwtTokensModule } from '~modules/jwt-tokens/jwt-tokens.module';
import { ApiConfigModule } from '~modules/api-config/api-config.module';

@Module({
  imports: [UsersModule, JwtTokensModule, ApiConfigModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
