export interface IUser {
  username: string;
  email: string;
  password: string;
  client_id: string | string[];
}

export interface IUserUpdate {
  username?: string;
  email?: string;
  password?: string;
  client_id?: string | string[];
}

