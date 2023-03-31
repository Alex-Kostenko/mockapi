import { IUser } from '../types';

export const VALIDATIONS_ERRORS: IUser = {
  name: 'Name must include only letters and be up to 400 characters long',
  age: 'Age must be a number and up to 200',
  about: 'About must be up to 4000 characters long',
};

export const INITIAL_USER: IUser = {
  name: '',
  age: '',
  about: '',
};
