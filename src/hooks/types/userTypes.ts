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

export interface IGetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface IUserResult {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "User";
  places_count: number;
  created_at: string;
  updated_at: string;
}

export interface IUsersResponse {
  message: string;
  data: IUserResult[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}
