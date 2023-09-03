export interface User {
  id: number;
  name: string;
  email: string;
  lastname: string;
  username: string;
}

export interface UserForm extends User {
  password: string;
  confirmPassword: string;
}
export interface CurrentUser extends User {
  token: string;
}
