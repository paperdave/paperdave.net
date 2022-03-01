import { StructureJSON } from '$lib/api-client/api-shared';
import { getDatabase } from '$lib/db';
import { Token, TOKEN_LENGTH, User } from '$lib/structures';
import { GenericSuccess } from '$lib/utils/api';
import { Instance, Structure, types } from '@davecode/structures';
import { RequestHandler, RequestHandlerOutput } from '@sveltejs/kit';
import { createHash, randomBytes } from 'crypto';

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
  return new Promise<string>((resolve, reject) => {
    randomBytes(TOKEN_LENGTH, function (err, buffer) {
      if (err) {
        reject(err);
      }
      resolve(buffer.toString('hex'));
    });
  });
}

/** Creates a login token */
export const post: RequestHandler = async ({ request }) => {
  const { email, password } = LoginRequest.fromJSON(await request.json());

  const userDB = await getDatabase(User);
  const user = await userDB.findOne({ email });

  console.log(user);

  if (!user) {
    return IncorrectLogin;
  }

  const hashed = createHash('sha256').update(`${user.salt}_${email}_${password}`).digest('hex');

  if (user.passwordHash !== hashed) {
    return IncorrectLogin;
  }

  const tokenText = await generateTokenString();
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
