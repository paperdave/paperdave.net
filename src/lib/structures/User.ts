import { Instance, Structure, types } from '@davecode/structures';
import { Permission } from './enums';
import { DavecodeImage } from './Image';

export const ClientUser = new Structure('ClientUser')
  .prop('name', types.String)
  .prop('email', types.String)
  .prop('avatar', DavecodeImage.nullable)
  .prop('permissions', types.SetOf(Permission), { default: () => new Set() })
  .method('queryPermission', function (permission: Permission) {
    return this.permissions.has(Permission.DAVE) || this.permissions.has(permission);
  })
  .create();

export type ClientUser = Instance<typeof ClientUser>;

export const User = ClientUser.extend('User')
  .prop('passwordHash', types.String, { default: '' })
  .prop('salt', types.String, { default: '' })
  .method('toClientUser', function () {
    return new ClientUser(this);
  })
  .create();

export type User = Instance<typeof User>;
