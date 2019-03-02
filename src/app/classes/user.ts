import { IUser } from '../interfaces/user';

export class User implements IUser {
  name: string;
  lastName: string;
  email: string;
  birth: Date;

  constructor (name: string, lastName: string, email: string, birth: Date) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.birth = birth;
  }

  getName() {
    return this.name;
  }

  getLastName() {
    return this.lastName;
  }

  getEmail() {
    return this.email;
  }

  getBirth() {
    return this.birth;
  }

  getUser() {
    return this;
  }
}
