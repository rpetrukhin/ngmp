import { IUserAuthInfo } from '../interfaces/user-auth-info.model';

export class UserAuthInfo implements IUserAuthInfo {
  email: string;
  password: string;
}
