import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IOnePlaceResult, IPlaceResult } from "../types/placesTypes";

export interface IWishListStore {
  wishList: IPlaceResult[];
  wishListCount: number;
  addToWishList: (body: IPlaceResult) => void;
  removeFromWishList: (id: number) => void;
  removeAllWishList: () => void;
}

export const useWishList = create<IWishListStore>()(
  persist(
    (set) => ({
      wishList: [],
      wishListCount: 0,
      addToWishList: (body) => {
        set((state) => {
          const newWishList = [...state.wishList, body];
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
