import { Data, JSONData } from './structure-utils';
import { Permission, User } from './User';

export class WebSession {
  user?: WebSessionUser;
  destroyed: boolean;

  constructor(data?: Data<WebSession>) {
    if (data) {
      this.user = data.user;
      this.destroyed = data.destroyed;
    } else {
      this.user = undefined;
      this.destroyed = false;
    }
  }

  static fromJSON(data: JSONData<WebSession>) {
    return new WebSession({
      user: data.user ? WebSessionUser.fromJSON(data.user) : undefined,
      destroyed: false,
    });
  }

  static get destroyedSession() {
    return new WebSession().destroy();
  }

  toJSON() {
    return {
      user: this.user ? this.user.toJSON() : undefined,
    };
  }

  setUser(user: WebSessionUser) {
    this.user = user;
    return this;
  }

  destroy() {
    this.destroyed = true;
    return this;
  }

  initialize() {
    this.destroyed = false;
    return this;
  }
}

export class WebSessionUser {
  id: string;
  name: string;
  email: string;
  permissions: Set<Permission>;

  constructor(data?: Data<WebSessionUser>) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.permissions = data.permissions;
    } else {
      this.id = '';
      this.name = '';
      this.email = '';
      this.permissions = new Set();
    }
  }

  static fromJSON(data: JSONData<WebSessionUser>) {
    return new WebSessionUser({
      id: data.id,
      name: data.name,
      email: data.email,
      permissions: new Set(data.permissions),
    });
  }

  static fromUser(user: User) {
    return new WebSessionUser({
      id: user.email,
      name: user.email,
      email: user.email,
      permissions: user.permissions,
    });
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      permissions: [...this.permissions],
    };
  }
}
