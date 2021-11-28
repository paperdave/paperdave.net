import { WebSessionUser } from '$lib/structures';
import { getWebSession, webSession } from '$lib/utils/client';
import { resolveAPIError } from '$lib/utils/promise';
import { LoginRequest, LoginSuccess } from 'src/routes/api/v1/auth/login';
import { APIClient } from './ApiClient';

/** Client API class that parallels the /artifact endpoints */
export class DavecodeAuthenticationAPI {
  constructor(private readonly client: APIClient) {}

  /** Attempts to login your current session. Returns a boolean if your credientials were accepted. */
  async login(email: string, password: string): Promise<boolean> {
    const { response, err } = await resolveAPIError(
      this.client.post<LoginRequest, LoginSuccess>('/auth/login', {
        email,
        password,
      })
    );

    if (err && err.status === 401) {
      return false;
    }
    if (response && response.data.success) {
      webSession.set(getWebSession().setUser(WebSessionUser.fromJSON(response.data.user)));
      return true;
    } else {
      throw err ?? new Error('Unknown error');
    }
  }
}
