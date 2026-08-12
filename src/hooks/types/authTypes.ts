import { IUserProfile } from "./userTypes";

export interface IRegisterBody {
  name: string;
  email: string;
  password: string;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export interface IUserPlace {
  id: number;
  title: string;
  city: string;
  price: number;
  type: "Beach" | "Culture" | "Adventure" | "Nature" | "City";
  image: string | null;
}

export interface IProfileResponse {
  message: string;
  data: IUserProfile;
}
