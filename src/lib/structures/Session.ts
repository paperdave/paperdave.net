import { UserPermission } from './User';

export interface ISession {
  user?: ISessionUser;
}

export interface ISessionUser {
  id: string;
  name: string;
  email: string;
  permissions: UserPermission[];
}
