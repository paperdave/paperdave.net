import { ObjectId } from 'bson';
import { Data, JSONData, schema } from './structure-utils';

export enum UserPermission {
  RESPOND_TO_QUESTIONS = 'RESPOND_TO_QUESTIONS',
}

@schema('users')
export class User {
  id: ObjectId;
  email: string;
  passwordHash: string;
  permissions: Set<UserPermission>;
  salt: string;

  constructor(data?: Data<User>) {
    if (data) {
      this.id = data.id;
      this.email = data.email;
      this.passwordHash = data.passwordHash;
      this.permissions = data.permissions;
      this.salt = data.salt;
    } else {
      this.id = new ObjectId();
      this.email = '';
      this.passwordHash = '';
      this.permissions = new Set();
      this.salt = '';
    }
  }

  toJSON() {
    return {
      _v: 0,
      _id: this.id,
      email: this.email,
      passwordHash: this.passwordHash,
      permissions: [...this.permissions],
      salt: this.salt,
    };
  }

  static fromJSON(data: JSONData<User>) {
    return new User({
      id: data._id,
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

  setId(id: ObjectId) {
    this.id = id;
    return this;
  }

  getClientUser() {
    return {
      id: this.id.toHexString(),
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
