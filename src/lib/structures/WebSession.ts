import { Data, JSONData } from './structure-utils';
import { Permission, User } from './User';

export class WebSession {
  user?: WebSessionUser;
  expires: Date;
  destroyed: boolean;

  constructor(data?: Data<WebSession>) {
    if (data) {
      this.user = data.user;
      this.destroyed = data.destroyed;
      this.expires = data.expires;
    } else {
      this.user = undefined;
      this.destroyed = false;
      this.expires = new Date();
    }
  }

  static fromJSON(data: JSONData<WebSession>) {
    return new WebSession({
      user: data.user ? WebSessionUser.fromJSON(data.user) : undefined,
      destroyed: false,
      expires: new Date(data.expires),
    });
  }

  static get empty() {
    return new WebSession().destroy();
  }

  toJSON() {
    return {
      user: this.user ? this.user.toJSON() : undefined,
      expires: this.expires.getTime(),
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
  name: string;
  email: string;
  permissions: Set<Permission>;

  constructor(data?: Data<WebSessionUser>) {
    if (data) {
      this.name = data.name;
      this.email = data.email;
      this.permissions = data.permissions;
    } else {
      this.name = '';
      this.email = '';
      this.permissions = new Set();
    }
  }

  static fromJSON(data: JSONData<WebSessionUser>) {
    return new WebSessionUser({
      name: data.name,
      email: data.email,
      permissions: new Set(data.permissions),
    });
  }

  static fromUser(user: User) {
    return new WebSessionUser({
      name: user.name,
      email: user.email,
      permissions: user.permissions,
    });
  }

  toJSON() {
    return {
      name: this.name,
      email: this.email,
      permissions: [...this.permissions],
    };
  }

  hasPermission(permission: Permission) {
    return this.permissions.has(permission);
  }

  hasPermissions(permissions: Permission[]) {
    return permissions.every((permission) => this.hasPermission(permission));
  }
}
