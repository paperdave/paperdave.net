import { sha256 } from 'crypto-hash';
import { Data, JSONData } from './structure-utils';

export enum UserPermission {
  RESPOND_TO_QUESTIONS = 'RESPOND_TO_QUESTIONS',
}

@schema('users')
export class User {
  email: string;
  passwordHash: string;
  permissions = new Set<UserPermission>();

  constructor(data?: Data<User>) {
    if (data) {
      this.email = data.email;
      this.passwordHash = data.passwordHash;
      this.permissions = data.permissions;
    }
  }

  toJSON() {
    return {
      email: this.email,
      passwordHash: this.passwordHash,
      permissions: [...this.permissions],
    };
  }

  static fromJSON(data: JSONData<User>) {
    return new User({
      email: data.email,
      passwordHash: data.passwordHash,
      permissions: new Set(data.permissions),
    });
  }

  setEmail(email: string) {
    this.email = email;
    return this;
  }

  setPasswordHashed(passwordHash: string) {
    this.passwordHash = passwordHash;
    return this;
  }

  /** NOTE: This method is async! */
  async setPasswordUnhashed(password: string) {
    this.passwordHash = await sha256(password);
    return this;
  }

  async checkPassword(password: string) {
    return (await sha256(password)) === this.passwordHash;
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
