export interface IUser {
  id?: string;
  name: string;
  age: string;
  about: string;
  createdAt?: string;
}

export interface FormErrors {
  name?: string;
  age?: string;
  about?: string;
}
