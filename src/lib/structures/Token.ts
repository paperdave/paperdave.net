import { Structure, types, type Instance } from '@davecode/structures';

export const TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;
export const TOKEN_LENGTH = 32;

/** Documentation etc */
export const Token = new Structure('Token')
  .prop('email', types.String)
  .prop('token', types.String)
  .prop('expires', types.Date, {
    default: () => new Date(Date.now() + TOKEN_EXPIRE_TIME),
  })
  .method('isValid', function () {
    return this.expires.getTime() > Date.now();
  })
  .method('refresh', function () {
    this.expires = new Date(Date.now() + TOKEN_EXPIRE_TIME);
  })
  .create();

export type Token = Instance<typeof Token>;
