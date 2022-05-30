import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { ApiConfigService } from '~modules/api-config/services/api-config.service';
import { JwtTokensPairInterface } from '~modules/jwt-tokens/interfaces/jwt-tokens-pair.interface';

@Injectable()
export class SetJwtTokensInterceptor implements NestInterceptor {
  constructor(
    private readonly _apiConfigService: ApiConfigService
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(map(body => {
      const { tokens, ...rest } = body;
      if (!tokens) {
        throw new InternalServerErrorException('Response must have tokens');
      }
      const { accessToken, refreshToken }: JwtTokensPairInterface = tokens;
      response.cookie('refreshToken', refreshToken, {
        maxAge: this._apiConfigService.jwtRefreshTokenExpiresIn,
        httpOnly: true
      });
      return { accessToken, ...rest };
    }));
  }
}
