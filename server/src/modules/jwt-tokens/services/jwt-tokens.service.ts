import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { ApiConfigService } from '~modules/api-config/services/api-config.service';
import { JwtPayloadInterface } from '~modules/jwt-tokens/interfaces/jwt-payload.interface';
import { JwtTokensPairInterface } from '~modules/jwt-tokens/interfaces/jwt-tokens-pair.interface';
import { JwtDecodedTokenInterface } from '~modules/jwt-tokens/interfaces/jwt-decoded-token.interface';

@Injectable()
export class JwtTokensService {
  constructor(
    private readonly _apiConfigService: ApiConfigService
  ) {}

  generateTokens(payload: JwtPayloadInterface): JwtTokensPairInterface {
    const accessToken = jwt.sign(payload,
      this._apiConfigService.jwtAccessTokenSecret,
      { expiresIn: this._apiConfigService.jwtAccessTokenExpiresIn }
    );
    const refreshToken = jwt.sign(payload,
      this._apiConfigService.jwtRefreshTokenSecret,
      { expiresIn: this._apiConfigService.jwtRefreshTokenExpiresIn }
    );
    return { accessToken, refreshToken };
  }

  decodeAccessToken(accessToken: string): JwtDecodedTokenInterface {
    try {
      return jwt.verify(
        accessToken,
        this._apiConfigService.jwtAccessTokenSecret
      ) as unknown as JwtDecodedTokenInterface;
    } catch {
      throw new UnauthorizedException('Access token is not valid');
    }
  }

  decodeRefreshToken(refreshToken: string): JwtDecodedTokenInterface {
    try {
      return jwt.verify(
        refreshToken,
        this._apiConfigService.jwtRefreshTokenSecret
      ) as unknown as JwtDecodedTokenInterface;
    } catch {
      throw new UnauthorizedException('Refresh token is not valid');
    }
  }
}
