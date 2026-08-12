import { useQuery } from "@tanstack/react-query";
import { statisticsApi } from "../api/statisticsApi";

export interface IGetStatsResponse {
  success: boolean;
  data: IStatsResult;
}

export interface IStatsResult {
  totalUsers: number;
  totalPlaces: number;
  countries: number;
  avgRating: number;
}

export const useGetStatistics = () =>
  useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const response = await statisticsApi.get<IGetStatsResponse>("/statistics");
      return response.data.data;
    },
  });
