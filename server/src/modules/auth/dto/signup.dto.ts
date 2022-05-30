import { PickType } from '@nestjs/swagger';

import { UserValidation } from '~modules/users/validation/user.validation';

export class SignupDto extends PickType(
  UserValidation,
  ['email', 'password'] as const
) {}
