import type { StructureJSON } from '$lib/api-client/api-shared';
import { getDatabase } from '$lib/db';
import { Token, TOKEN_LENGTH, User } from '$lib/structures';
import type { GenericSuccess } from '$lib/utils/api';
import { Structure, types, type Instance } from '@davecode/structures';
import type { RequestHandler, RequestHandlerOutput } from '@sveltejs/kit';

// note: move to bcrypt for passwords. but i dont care since it's literally one user account LOL.

export const LoginRequest = new Structure('LoginRequest')
  .prop('email', types.String)
  .prop('password', types.String)
  .create();

export type LoginRequest = Instance<typeof LoginRequest>;

export interface LoginSuccess extends GenericSuccess {
  user: StructureJSON;
  token: string;
  expires: number;
}

const IncorrectLogin: RequestHandlerOutput = {
  status: 401,
  body: {
    error: 'Incorrect email or password.',
  },
};

function generateTokenString() {
  const array = crypto.getRandomValues(new Uint8Array(TOKEN_LENGTH));
  return array.reduce((str, byte) => str + byte.toString(16), '');
}

/** Creates a login token */
export const post: RequestHandler = async ({ request }) => {
  const { email, password } = LoginRequest.fromJSON(await request.json());

  const userDB = await getDatabase(User);
  const user = await userDB.findOne({ email });

  if (!user) {
    return IncorrectLogin;
  }

  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(`${user.salt}_${email}_${password}`)
  );
  const hashed = Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  if (user.passwordHash !== hashed) {
    return IncorrectLogin;
  }

  const tokenText = generateTokenString();
  const tokenDB = await getDatabase(Token);

  const token = new Token({
    email: user.email,
    token: tokenText,
  });

  await tokenDB.insertOne(token);

  return {
    status: 200,
    body: {
      success: true,
      user: user.toClientUser().toJSON(),
      token: token.toJSON(),
    },
  } as RequestHandlerOutput;
};
