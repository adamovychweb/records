import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Response,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { Response as Res } from 'express';

import { SignupDto } from '~modules/auth/dto/signup.dto';
import { AuthService } from '~modules/auth/services/auth.service';
import { LoginDto } from '~modules/auth/dto/login.dto';
import { SetJwtTokensInterceptor } from '~modules/auth/interceptors/set-jwt-tokens.interceptor';
import { RefreshJwtGuard } from '~modules/auth/guards/refresh-jwt.guard';
import { GetUser } from '~src/modules/users/decorators/get-user.decorator';
import { UserEntity } from '~modules/users/entities/user.entity';
import { ReadableUserSerializer } from '~modules/users/serializers/readable-user.serializer';
import { ApiConfigService } from '~modules/api-config/services/api-config.service';
import { JwtTokensService } from '~modules/jwt-tokens/services/jwt-tokens.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _apiConfigService: ApiConfigService,
    private readonly _jwtTokensService: JwtTokensService
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signup(
    @Body() signupDto: SignupDto
  ) {
    await this._authService.signup(signupDto);
    return { message: 'User successfully created' };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(SetJwtTokensInterceptor)
  async login(
    @Body() loginDto: LoginDto,
  ) {
    const user = await this._authService.login(loginDto);
    const tokens = this._jwtTokensService.generateTokens({ id: user.id });
    return { tokens, user: new ReadableUserSerializer(user) };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshJwtGuard)
  logout(
    @Response({ passthrough: true }) res: Res
  ) {
    res.clearCookie('refreshToken');
  }

  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshJwtGuard)
  @UseInterceptors(SetJwtTokensInterceptor)
  refreshTokens(
    @GetUser() user: UserEntity
  ) {
    const tokens = this._jwtTokensService.generateTokens({ id: user.id });
    return { tokens, user: new ReadableUserSerializer(user) };
  }
}
