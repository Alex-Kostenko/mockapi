export interface IUser {
  id?: string;
  name?: string;
  age?: string;
  about?: string;
  createdAt?: string;
}

export interface IRow {
  id: string;
  name: string;
}
export interface IFormErrors {
  name?: string;
  age?: string;
  about?: string;
}

export interface IStateContext {
  [id: string]: { [name: string]: string };
}
export interface IAddNewDataForm {
  open: boolean;
  isSubmit: boolean;
}
