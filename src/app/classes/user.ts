import { IUser } from '../interfaces/user';

export class User implements IUser {
  userName: string;
  name: string;
  lastName: string;
  email: string;
  birth: Date;

  constructor (userName: string, name: string, lastName: string, email: string, birth: Date) {
    this.userName = userName;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.birth = birth;
  }
}
