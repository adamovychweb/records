import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

import { UserEntity } from '~modules/users/entities/user.entity';


export const GetUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    if (!req.user || !(req.user instanceof UserEntity)) {
      throw new InternalServerErrorException('No user in request');
    }
    return req.user as UserEntity;
  }
);
