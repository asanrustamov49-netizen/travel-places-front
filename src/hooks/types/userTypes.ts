export interface INewUserBody {
  id: number;
  body: IUserBody;
}

export interface IUserBody {
  name: string;
  email: string;
}

export interface IUserResponse {
  message: string;
  data: IUserResult[];
}

export interface IOneUserResponse {
  message: string;
  data: IUserResult;
}

export interface IUserResult {
  id: number;
  name: string;
  email: string;
  created_at: number;
  updated_at: number;
}
