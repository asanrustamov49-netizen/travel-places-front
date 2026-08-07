export interface IPlaceNewBody {
  id: number;
  body: ICreatePlaceBody;
}
export interface IPlaceResponse {
  message: string;
  data: IPlaceResult[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface IOnePlaceResponse {
  message: string;
  data: IPlaceResult;
}

export interface ICreatePlaceBody {
  country_id: number;
  title: string;
  description: string;
  city: string;
  type: "Beach" | "Culture" | "Adventure" | "Nature" | "City";
  price: number;
  images: File[];
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
  title: string;
  description: string;
  city: string;
  type: "Beach" | "Culture" | "Adventure" | "Nature" | "City";
  price: number;
  rating: number;
  created_at: string;
  user_id: number;
  author_name: string;
  author_avatar?: string;
  country_id: number;
  country_name: string;
  image: IPlaceImage
}

export interface IPlaceImage {
  id: number;
  place_id: number;
  image_url: string;
  created_at: string;
}

export type TSort =
  | "newest"
  | "price-low"
  | "price-high"
  | "rating"
  | "alphabetical";

export type TypeSort =
  | "All"
  | "Beach"
  | "Culture"
  | "Adventure"
  | "Nature"
  | "City";

export interface IGetPlacesParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: TypeSort;
  sort?: TSort;
}
