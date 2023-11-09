export interface Login {
  login: string;
  password: string;
}

export interface User {
  user: UserClass;
  access_token: string;
}

export interface UserClass {
  id: string;
  name: string;
  cpf: string;
  company: string;
  phone: string;
  email: string;
  device_token: null;
  login: string;
  registration: string;
  active: boolean;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface UserFilter {
  name: string;
}