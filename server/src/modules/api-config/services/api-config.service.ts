import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiConfigService {
  constructor(
    private readonly _configService: ConfigService
  ) {}

  get port(): number {
    return this._configService.get('PORT') as number;
  }

  get webAppUrl(): string {
    return this._configService.get('WEB_APP_URL') as string;
  }

  get jwtAccessTokenSecret(): string {
    return this._configService.get('JWT_ACCESS_TOKEN_SECRET') as string;
  }

  get jwtRefreshTokenSecret(): string {
    return this._configService.get('JWT_REFRESH_TOKEN_SECRET') as string;
  }

  get jwtAccessTokenExpiresIn(): number {
    return this._configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN') as number;
  }

  get jwtRefreshTokenExpiresIn(): number {
    return this._configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN') as number;
  }
}
