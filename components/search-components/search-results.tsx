import useSearch from "@/api/get-search";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Tabs } from "@/components/ui/vercel-tabs";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import MovieCard from "@/app/movie-card";
import { MovieTypes } from "@/types/movie-by-id";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import useGetDiscoverSearch from "@/api/get-discover-search";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonCard1 from "@/components/ui/movie-card-skeleton-1";
import SkeletonCard2 from "@/components/ui/movie-card-skeleton-2";

export default function SearchResult() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const media_type = searchParams.get("type") ?? "";
  const [keyword_id, setKeyword_id] = useState<number | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.3,
  });
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isPending,
  } = useSearch<MovieTypes>({ query, media_type });
  const {
    data: data_discover,
    isLoading: isLoading_discover,
    fetchNextPage: fetchNextPage_discover,
    hasNextPage: hasNextPage_discover,
    isFetchingNextPage: isFetchingNextPage_discover,
  } = useGetDiscoverSearch({ media_type: "movie", keyword_id });

  const results = data?.pages.flatMap((p) => p.results) ?? [];
  const results_discover = data_discover?.pages.flatMap((p) => p.results) ?? [];

  useEffect(() => {
    if (media_type === "keyword" && results.length > 0) {
      setKeyword_id(results[0].id);
    } else {
      setKeyword_id(null);
    }
  }, [media_type, results.length]);

  useEffect(() => {
    if (inView) {
      if (media_type === "keyword" && hasNextPage_discover) {
        fetchNextPage_discover();
      } else if (media_type !== "keyword" && hasNextPage) {
        fetchNextPage();
      }
    }
  }, [
    inView,
    hasNextPage_discover,
    hasNextPage,
    fetchNextPage_discover,
    fetchNextPage,
    media_type,
  ]);

  const isKeyword = media_type === "keyword";
  const resultsLength = results.length === 0;
  const items = isKeyword ? results_discover : results;
  const filtered = items.filter(
    (x) => x.poster_path && x.vote_average > 1 && x.vote_count > 10
  );
  const isLoadingItems = isKeyword ? isLoading_discover : isLoading;
  const isFetchingMore = isKeyword
    ? isFetchingNextPage_discover
    : isFetchingNextPage;
  const hasMore = isKeyword ? hasNextPage_discover : hasNextPage;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [query]);
  return (
    <div className="relative flex flex-col items-center min-h-[calc(100dvh-390px)] lg:pt-30 pt-20 max-w-[90%] mx-auto space-y-10 ">
      {isKeyword &&
        (isLoading ? (
          <div className="grid lg:grid-cols-7 grid-cols-3 w-full lg:gap-4 gap-2">
            {[...Array(7)].map((_, i) => (
              <Skeleton key={i} className="h-9 w-full" />
            ))}
          </div>
        ) : resultsLength ? (
          <p>No Data.</p>
        ) : (
          <ScrollArea className="w-full h-10.5  overflow-x-auto">
            <Tabs
              tabs={results}
              onTabChange={(tabId) => setKeyword_id(tabId)}
            />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ))}

      <div className="grid lg:grid-cols-7 grid-cols-3 lg:gap-4 gap-2 w-full">
        {isLoadingItems
          ? [...Array(7)].map((_, i) => <SkeletonCard1 key={i} />)
          : filtered.map((item) => (
              <MovieCard
                key={item.id}
                movie={item}
                media_type={media_type === "keyword" ? "movie" : media_type}
              />
            ))}
        {[...Array(7)].map((_, i) => (
          <SkeletonCard2 pulse={false} key={i} />
        ))}
      </div>
      <div className="" ref={ref}>
        {isFetchingMore && <div>Loading more...</div>}
        {!isFetchingMore && items.length > 0 && !hasMore && (
          <div className="text-center text-gray-500">
            No more results found.
          </div>
        )}
      </div>
    </div>
  );
}
