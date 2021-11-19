export interface IUser {
  email?: string;
  token?: string;
}

export interface IContext extends IUser {
  authenticate: (email: string, password: string) => Promise<any>;
  registrate: (fistName: string, lastName: string, email: string, password: string) => Promise<any>;
  logout: () => void;
}

export interface IAuthProvider {
  children: JSX.Element;
}