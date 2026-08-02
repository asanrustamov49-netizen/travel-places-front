export interface ICountryResponse {
  message: string;
  data: ICountryResult[];
}

export interface ICountryResult {
  id: number;
  name: string;
  continent: string;
  created_at: string;
  updated_at: string;
}
