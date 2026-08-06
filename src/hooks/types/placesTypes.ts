export interface IPlaceNewBody {
  id: number;
  body: ICreatePlaceBody;
}
export interface IPlaceResponse {
  message: string;
  data: IPlaceResult[];
}

export interface IOnePlaceResponse {
  message: string;
  data: IPlaceResult;
}

export interface ICreatePlaceBody {
  user_id: number;
  country_id: number;
  title: string;
  description: string;
  city: string;
  type: "Beach" | "Culture" | "Adventure" | "Nature" | "City";
  price: number;
  images: string[];
}

export interface IPlaceFilters {
  country_id?: number;
  type?: PlaceType;
  minPrice?: number;
  maxPrice?: number;

  sort?: "price_asc" | "price_desc" | "newest" | "alphabetical";

  page?: number;
  limit?: number;
}

export type PlaceType = "Beach" | "Culture" | "Adventure" | "Nature" | "City";

export interface IPlaceResult {
  id: number;
  user_id: number;
  country_id: number;
  title: string;
  description: string;
  city: string;
  type: PlaceType;
  price: number;
  rating: number | null;
  image: IPlaceImage;
  created_at: string;
  updated_at: string;
}

export interface IPlaceImage {
  id: number;
  place_id: number;
  image_url: string;
  created_at: string;
}

export interface IGetPlacesParams {
  type?: string;
  country_id?: number;
  price_min?: number;
  price_max?: number;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}