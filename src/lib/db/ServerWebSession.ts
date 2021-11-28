import { JSONData, Permission, User, WebSession, WebSessionUser } from '$lib/structures';
import { getDatabase } from '.';

export class ServerWebSession extends WebSession {
  userIsUpToDate = false;
  private serverUser?: User;

  static fromJSON(json: JSONData<WebSession>) {
    return new ServerWebSession(WebSession.fromJSON(json));
  }

  static get empty() {
    return new ServerWebSession(WebSession.empty);
  }

  async updateUserMeta() {
    if (this.user) {
      const db = await getDatabase(User);
      const user = await db.findOne({ id: this.user.id });
      if (user) {
        this.user = WebSessionUser.fromUser(User.fromJSON(user));
        this.serverUser = User.fromJSON(user);
      }
    }
  }

  async ensureUpToDate() {
    if (!this.userIsUpToDate) {
      await this.updateUserMeta();
      this.userIsUpToDate = true;
    }
  }

  async getServerUser() {
    await this.ensureUpToDate();
    return this.serverUser;
  }

  async refreshAndCheckPermission(permission: Permission) {
    await this.ensureUpToDate();
    return this.user && this.user.queryPermission(permission);
  }

  logout() {
    this.user = undefined;
    this.userIsUpToDate = false;
    this.serverUser = undefined;
  }

  toWebSession() {
    return new WebSession(this);
  }
}
