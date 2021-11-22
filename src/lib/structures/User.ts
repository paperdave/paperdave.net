import { Data, JSONData, schema } from './structure-utils';

export enum UserPermission {
  RESPOND_TO_QUESTIONS = 'RESPOND_TO_QUESTIONS',
  MANAGE_USERS = 'MANAGE_USERS',
  VIEW_ARTIFACTS = 'VIEW_ARTIFACTS',
  EDIT_ARTIFACTS = 'EDIT_ARTIFACTS',
  CREATE_ARTIFACTS = 'CREATE_ARTIFACTS',
  DELETE_ARTIFACTS = 'DELETE_ARTIFACTS',
  PUBLISH_ARTIFACTS = 'PUBLISH_ARTIFACTS',
  MANAGE_NOW = 'MANAGE_NOW',
  MANAGE_FEATURED = 'MANAGE_FEATURED',
}

@schema('users')
export class User {
  email: string;
  passwordHash: string;
  permissions: Set<UserPermission>;
  salt: string;

  constructor(data?: Data<User>) {
    if (data) {
      this.email = data.email;
      this.passwordHash = data.passwordHash;
      this.permissions = data.permissions;
      this.salt = data.salt;
    } else {
      this.email = '';
      this.passwordHash = '';
      this.permissions = new Set();
      this.salt = '';
    }
  }

  toJSON() {
    return {
      _v: 0,
      email: this.email,
      passwordHash: this.passwordHash,
      permissions: [...this.permissions],
      salt: this.salt,
    };
  }

  static fromJSON(data: JSONData<User>) {
    return new User({
      email: data.email,
      passwordHash: data.passwordHash,
      permissions: new Set(data.permissions),
      salt: data.salt,
    });
  }

  setEmail(email: string) {
    this.email = email;
    return this;
  }

  setSalt(salt: string) {
    this.salt = salt;
    return this;
  }

  setPasswordHashed(passwordHash: string) {
    this.passwordHash = passwordHash;
    return this;
  }

  getClientUser() {
    return {
      email: this.email,
      name: this.email,
      permissions: [...this.permissions],
    };
  }

  hasPermission(permission: UserPermission) {
    return this.permissions.has(permission);
  }

  addPermission(permission: UserPermission) {
    this.permissions.add(permission);
    return this;
  }

  removePermission(permission: UserPermission) {
    this.permissions.delete(permission);
    return this;
  }
}
