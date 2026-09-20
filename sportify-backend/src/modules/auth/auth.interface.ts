export interface ILoginPayload {
  email: string;
  password?: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password?: string;
  role?: string;
}

export interface IAuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}
