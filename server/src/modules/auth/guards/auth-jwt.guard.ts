import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtTokensService } from '~modules/jwt-tokens/services/jwt-tokens.service';
import { UsersRepository } from '~modules/users/repositories/users.repository';

@Injectable()
export class AuthJwtGuard implements CanActivate {
  constructor(
    private readonly _jwtTokensService: JwtTokensService,
    private readonly _usersRepository: UsersRepository
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UnauthorizedException('No authorization token');
    }
    const [bearer, accessToken] = (authorization as string).split(' ');
    if (!bearer || bearer !== 'Bearer' || !accessToken) {
      throw new UnauthorizedException('Wrong token format');
    }
    const decoded = await this._jwtTokensService.decodeAccessToken(accessToken);
    const user = await this._usersRepository.findOne({ id: decoded.id });
    if (!user) {
      throw new UnauthorizedException('Faulty token');
    }
    req.user = user;
    return true;
  }
}
