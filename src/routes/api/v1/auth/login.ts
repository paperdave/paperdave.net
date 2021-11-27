import { getDatabase } from '$lib/db';
import { JSONData, User, WebSessionUser } from '$lib/structures';
import { APIErrorResponse, APIHandler, APIResponse, GenericSuccess } from '$lib/utils/api';
import { createHash } from 'crypto';

// note: move to bcrypt for passwords. but i dont care since it's literally one user account LOL.

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginSuccess extends GenericSuccess {
  user: JSONData<WebSessionUser>;
}

const IncorrectLogin: APIResponse<APIErrorResponse> = {
  status: 401,
  body: {
    error: 'Incorrect email or password.',
  },
};

export const post: APIHandler<LoginRequest, LoginSuccess> = async ({ body, locals }) => {
  locals.session.logout();

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

  locals.session.user = WebSessionUser.fromUser(user);

  return {
    status: 200,
    body: {
      success: true,
      user: locals.session.user.toJSON(),
    },
  };
};
