import { IUserAuthInfo } from '../interfaces/user-auth-info.model';

export class UserAuthInfo implements IUserAuthInfo {
  login: string;
  password: string;
}
