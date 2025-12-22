"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import MovieCard from "@/app/movie-card";
import useGetDiscoverInfinite from "@/api/get-discover-infinite";
import { MovieTypes } from "@/types/movie-by-id";
import { useInView } from "react-intersection-observer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import SkeletonCard2 from "@/components/ui/movie-card-skeleton-2";
import { IconGhost2Filled, IconMovieOff } from "@tabler/icons-react";
import SkeletonCard1 from "@/components/ui/movie-card-skeleton-1";
import {
  movie_endpoints,
  tv_endpoints,
  anime_endpoints,
} from "@/constants/movie-endpoints";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
export default function DiscoverResult() {
  const params = useParams();
  const slug = params.slug;
  console.log("slug", slug);

  const router = useRouter();
  const handleCloseDrawer = (value: boolean) => {
    if (!value) {
      setTimeout(() => router.back(), 300);
    }
  };
  const { ref, inView } = useInView({
    threshold: 0.3,
  });
  const END_POINTS = [...movie_endpoints, ...tv_endpoints, ...anime_endpoints];
  const findEndpoint = END_POINTS.find((endpoint) => endpoint.id === slug);

  if (!findEndpoint) {
    notFound();
  }
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetDiscoverInfinite<MovieTypes>({
      endpoint: `discover`,
      media_type: findEndpoint.media_type,
      params: findEndpoint.params,
    });
  const results = data?.pages.flatMap((p) => p.results) ?? [];

  const filtered = results.filter(
    (f) => f.vote_average > 2 && f.poster_path && f.genre_ids.length > 1
  );
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  return (
    <div className="lg:w-[90%] w-[95%] mx-auto py-10">
      <Button onClick={() => handleCloseDrawer(false)} variant="outline">
        <ArrowLeft /> Go Back
      </Button>
      <h1 className=" uppercase  mask-[linear-gradient(to_bottom,black_0%,transparent_85%)] lg:text-7xl text-3xl font-bold text-red-700  translate-y-1  tracking-tighter pointer-events-none text-center ">
        {findEndpoint.displayName}
      </h1>

      <div className="grid lg:grid-cols-7 grid-cols-3 lg:gap-4 gap-2">
        {filtered?.map((meow) => (
          <MovieCard
            key={meow.id}
            movie={meow}
            media_type={findEndpoint.media_type}
          />
        ))}
        {[...Array(7)].map((_, i) => (
          <SkeletonCard2 pulse={isFetchingNextPage ? true : false} key={i} />
        ))}
      </div>

      <div
        className="grid lg:grid-cols-7 grid-cols-3 lg:gap-5 gap-3 min-h-20"
        ref={ref}
      >
        {hasNextPage && [...Array(7)].map((_, i) => <SkeletonCard1 key={i} />)}
      </div>
      {!hasNextPage && results.length > 0 && (
        <div className="flex justify-center items-center mt-10">
          <div className="flex flex-col items-center justify-center gap-3">
            {/* Movie-themed icon */}
            <div className="bg-popover p-4 rounded-full shadow-lg flex items-center justify-center animate-pulse">
              {/* Replace this with any movie icon from lucide-react or your icon library */}
              <IconGhost2Filled />
            </div>

            <div className="text-center leading-loose">
              <h1 className="font-medium">No more results</h1>
              <p className="text-muted-foreground  text-sm  max-w-xs">
                That’s all we have for now.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
