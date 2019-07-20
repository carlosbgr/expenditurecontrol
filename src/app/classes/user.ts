export interface IUser {
  name?: string;
  lastName?: string;
  email?: string;
  birth?: Date;
  language?: string;
}

export class User implements IUser {
  name: string;
  lastName: string;
  email: string;
  birth: Date;
  language: string;

  constructor (name: string, lastName: string, email: string, birth: Date, language: string) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.birth = birth;
    this.language = language;
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

  getLanguage() {
    return this.language;
  }

  getUser() {
    return this;
  }
}
