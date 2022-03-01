import { ClientUser } from '$lib/structures';
import { resolveAPIError } from '$lib/utils/promise';
import { APIClient } from './APIClient';
import { expires, token, user } from './session';

/** Client API class that parallels the /artifact endpoints */
export class DavecodeAuthenticationAPI {
  constructor(private readonly client: APIClient) {}

  /** Attempts to login your current session. Returns a boolean if your credientials were accepted. */
  async login(email: string, password: string): Promise<boolean> {
    const { response, err } = await resolveAPIError(
      this.client.post('/auth/login', {
        email,
        password,
      })
    );

    if (err && err.status === 401) {
      return false;
    }

    if (response && response.data.success) {
      token.set(response.data.token);
      expires.set(response.data.expires);
      user.set(ClientUser.fromJSON(response.data.user));
      return true;
    } else {
      throw err ?? new Error('Unknown error');
    }
  }
}
