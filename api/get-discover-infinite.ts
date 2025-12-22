"use client";
import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
export interface ReusableSwiperTypes {
  endpoint: string;
  media_type: string;
  params?: Record<string, string | number | null>;
  isVisible?: boolean;
  enable?: boolean;
}
interface TMDBResponse<T> {
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
}
export default function useGetDiscoverInfinite<T>({
  endpoint,
  media_type,
  params,
  isVisible,
}: ReusableSwiperTypes) {
  return useInfiniteQuery<TMDBResponse<T>>({
    queryKey: ["reusable_infinite", endpoint, media_type, params],
    enabled: isVisible,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${endpoint}/${media_type}`,
        {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_KEY,
            page: pageParam,
            ...params,
          },
        }
      );

      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    retry: false,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}
