import { UserInterface } from '~modules/users/interfaces/user.interface';

export type JwtPayloadInterface = Pick<UserInterface, 'id'>
