import { Module } from '@nestjs/common';

import { ApiConfigModule } from '~modules/api-config/api-config.module';
import { JwtTokensService } from '~modules/jwt-tokens/services/jwt-tokens.service';

@Module({
  imports: [ApiConfigModule],
  providers: [JwtTokensService],
  exports: [JwtTokensService]
})
export class JwtTokensModule {}
