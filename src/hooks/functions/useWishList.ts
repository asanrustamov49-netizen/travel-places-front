import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IOnePlaceResult, IPlaceResult } from "../types/placesTypes";

export interface IWishListStore {
  wishList: IPlaceResult[];
  wishListCount: number;
  addToWishList: (body: IPlaceResult | IOnePlaceResult) => void;
  removeFromWishList: (id: number) => void;
  removeAllWishList: () => void;
}

const normalizeToPlaceResult = (
  body: IPlaceResult | IOnePlaceResult,
): IPlaceResult => {
  if ("image" in body) {
    return body;
  }

  return {
    id: body.id,
    title: body.title,
    description: body.description,
    city: body.city,
    type: body.type,
    price: body.price,
    rating: body.rating,
    created_at: body.created_at,
    country_id: body.country_id,
    country_name: body.country_name,
    author_name: body.author_name,
    image: body.images[0] ?? null,
  };
};

export const useWishList = create<IWishListStore>()(
  persist(
    (set) => ({
      wishList: [],
      wishListCount: 0,
      addToWishList: (body) => {
        set((state) => {
          const normalized = normalizeToPlaceResult(body);
          const newWishList = [...state.wishList, normalized];
          return {
            wishList: newWishList,
            wishListCount: newWishList.length,
          };
        });
      },
      removeFromWishList: (id) => {
        set((state) => {
          const newWishList = state.wishList.filter((item) => item.id !== id);
          return {
            wishList: newWishList,
            wishListCount: newWishList.length,
          };
        });
      },
      removeAllWishList: () => {
        set({
          wishList: [],
          wishListCount: 0,
        });
      },
    }),
    {
      name: "wishList",
    },
  ),
);
