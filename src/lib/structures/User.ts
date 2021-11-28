import { Data, JSONData, schema } from './structure-utils';

export enum Permission {
  /** Grants all permissions, and also access to user-modification APIs and some other dave-only pages. */
  DAVE = 'DAVE',
  /** Grants access to the question responding dashboard */
  RESPOND_TO_QUESTIONS = 'RESPOND_TO_QUESTIONS',
  /** Grants access to list all artifacts / use the artifact explorer. */
  VIEW_ARTIFACTS = 'VIEW_ARTIFACTS',
  /** Grants access to modify artifact data. */
  EDIT_ARTIFACTS = 'EDIT_ARTIFACTS',
  /** Grants access to manage the /now page */
  MANAGE_NOW = 'MANAGE_NOW',
  /** Grants access to manage the featured list on the homepage */
  MANAGE_FEATURED = 'MANAGE_FEATURED',
  /** Grants access to view and manage the list of vault keys */
  MANAGE_VAULT = 'MANAGE_VAULT',
}

@schema('users')
export class User {
  name: string;
  email: string;
  avatar: string;
  permissions: Set<Permission>;
  passwordHash: string;
  salt: string;

  constructor(data?: Data<User>) {
    if (data) {
      this.name = data.name;
      this.email = data.email;
      this.avatar = data.avatar;
      this.passwordHash = data.passwordHash;
      this.permissions = data.permissions;
      this.salt = data.salt;
    } else {
      this.name = '';
      this.email = '';
      this.avatar = '';
      this.passwordHash = '';
      this.salt = '';
      this.permissions = new Set();
    }
  }

  toJSON() {
    return {
      _v: 0,
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      permissions: [...this.permissions],
      passwordHash: this.passwordHash,
      salt: this.salt,
    };
  }

  /** Removes sensitive server-side details. */
  toClientJSON() {
    const json = this.toJSON() as any;
    delete json.passwordHash;
    delete json.salt;
    return json as JSONData<User>;
  }

  static fromJSON(data: JSONData<User>) {
    return new User({
      name: data.name,
      email: data.email,
      avatar: data.avatar,
      permissions: new Set(data.permissions),
      passwordHash: data.passwordHash,
      salt: data.salt,
    });
  }

  setName(name: string) {
    this.name = name;
    return this;
  }

  setEmail(email: string) {
    this.email = email;
    return this;
  }

  setAvatar(avatar: string) {
    this.avatar = avatar;
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

  hasPermission(permission: Permission) {
    return this.permissions.has(permission);
  }

  addPermission(permission: Permission) {
    this.permissions.add(permission);
    return this;
  }

  removePermission(permission: Permission) {
    this.permissions.delete(permission);
    return this;
  }

  queryPermission(permission: Permission) {
    return this.permissions.has(permission) || this.permissions.has(Permission.DAVE);
  }

  queryPermissions(permissions: Permission[]) {
    return permissions.every((permission) => this.queryPermission(permission));
  }
}
