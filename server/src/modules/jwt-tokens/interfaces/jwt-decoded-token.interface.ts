import { JwtPayloadInterface } from '~modules/jwt-tokens/interfaces/jwt-payload.interface';

export type JwtDecodedTokenInterface = JwtPayloadInterface & {
  exp: string
  iat: string
}
