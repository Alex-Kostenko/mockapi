export interface IUser {
  id?: string;
  name: string;
  age: string;
  about: string;
  createdAt?: string;
}

export interface IFormErrors {
  name?: string;
  age?: string;
  about?: string;
}

export interface IColumn {
  Header: string;
  accessor: string;
}
