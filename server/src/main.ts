import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from '~src/app.module';
import { ApiConfigService } from '~modules/api-config/services/api-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiConfigService = app.get(ApiConfigService);
  const PORT = apiConfigService.port;
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: apiConfigService.webAppUrl
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true
  }));
  await app.listen(PORT);
  console.log(`App started on port: ${PORT}`);
}

bootstrap();
