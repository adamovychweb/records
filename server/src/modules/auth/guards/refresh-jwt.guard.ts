import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtTokensService } from '~modules/jwt-tokens/services/jwt-tokens.service';
import { UsersRepository } from '~modules/users/repositories/users.repository';

@Injectable()
export class RefreshJwtGuard implements CanActivate {
  constructor(
    private readonly _jwtTokensService: JwtTokensService,
    private readonly _usersRepository: UsersRepository
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token');
    }
    console.log('refresh guard', refreshToken);
    const decoded = await this._jwtTokensService.decodeRefreshToken(refreshToken);
    const user = await this._usersRepository.findOne({ id: decoded.id });
    if (!user) {
      throw new UnauthorizedException('Faulty token');
    }
    req.user = user;
    return true;
  }
}