export interface IGetRatingResponse {
  message: string;
  data: IRatingResult[];
}

export interface IGetOneRatingResponse {
  message: string;
  data: IRatingResult;
}

export interface IRatingResult {
  id: number;
  user_id: number;
  place_id: number;
  rating: number;
  created_at: string;
}

export interface ICreateRating {
    place_id: number
    rating: number
}