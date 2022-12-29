export interface IClient {
  name: string;
  email: string;
  cpf: string;
  phone?: string;
  address?: string
  user_id:  string;
}

export interface IClientUpdate {
  name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  address?: string;
}
