import { getDatabase } from '$lib/db';
import { JSONData, User } from '$lib/structures';
import { APIErrorResponse, APIHandler, APIResponse, GenericSuccess } from '$lib/utils/api';
import { createHash, randomBytes } from 'crypto';
import { EXPIRE_TIME, Token } from '../../../hooks';

// note: move to bcrypt for passwords. but i dont care since it's literally one user account LOL.

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginSuccess extends GenericSuccess {
  user: JSONData<User>;
  token: string;
  expires: number;
}

const IncorrectLogin: APIResponse<APIErrorResponse> = {
  status: 401,
  body: {
    error: 'Incorrect email or password.',
  },
};

function generateTokenString() {
  return new Promise<string>((resolve, reject) => {
    randomBytes(32, function (err, buffer) {
      if (err) {
        reject(err);
      }
      resolve(buffer.toString('hex'));
    });
  });
}

/** Creates a login token */
export const post: APIHandler<LoginRequest, LoginSuccess> = async ({ body, locals }) => {
  const { email, password } = body;

  const userDB = await getDatabase(User);
  const find = await userDB.findOne({ email });

  if (!find) {
    return IncorrectLogin;
  }

  const user = User.fromJSON(find);
  const hashed = createHash('sha256').update(`${user.salt}_${email}_${password}`).digest('hex');

  if (user.passwordHash !== hashed) {
    return IncorrectLogin;
  }

  const tokenText = await generateTokenString();

  const tokenDB = await getDatabase<Token>({ structureName: 'tokens' });
  await tokenDB.insertOne({
    email: user.email,
    token: tokenText,
    expires: Date.now() + EXPIRE_TIME,
  });

  return {
    status: 200,
    body: {
      success: true,
      user: user.toClientJSON(),
      token: tokenText,
      expires: Date.now() + EXPIRE_TIME,
    },
  };
};
