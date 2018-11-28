import { IUser } from '../interfaces/user.model';

export class User implements IUser {
    id: number;
    firstName: string;
    lastName: string;
}
