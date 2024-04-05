export interface IRegister {
  email: string;
  login: string;
  password: string;
  role?: number | any;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginStore {
  user: any;
  accessToken: string;
  refreshToken: string;
}
