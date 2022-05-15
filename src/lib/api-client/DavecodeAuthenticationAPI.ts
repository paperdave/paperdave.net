import { ClientUser, Token } from '$lib/structures';
import { resolveAPIError } from '$lib/utils/promise';
import type { APIClient } from './APIClient';
import { token, user } from './session';

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
      user.set(ClientUser.fromJSON(response.data.user));
      token.set(Token.fromJSON(response.data.token));
      return true;
    } else {
      throw err ?? new Error('Unknown error');
    }
  }

  async logout() {
    user.set(null);
    token.set(null);
  }
}
