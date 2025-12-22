"use client";

import {
  IconCarambolaFilled,
  IconCategoryPlus,
  IconFilter2Bolt,
  IconFilterPlus,
  IconFlame,
  IconFlameFilled,
  IconFolderCode,
  IconGhost2Filled,
  IconLoader,
  IconMovie,
  IconMovieOff,
  IconRefresh,
  IconReload,
  IconTransfer,
  IconTransferVertical,
  IconX,
} from "@tabler/icons-react";
import {
  ArrowUpRightIcon,
  Calendar,
  Check,
  ChevronsUpDown,
  Film,
  Minus,
  Plus,
  TextSearch,
  Tv,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import MovieCard from "@/app/movie-card";
import {
  keywordTopics,
  movieGenres,
  productionCompanies,
  tvGenres,
  tvNetworks,
} from "@/constants/filter";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import TitleReusable from "@/components/ui/title";
import useGetDiscoverInfinite from "@/api/get-discover-infinite";
import { MovieTypes } from "@/types/movie-by-id";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hook/use-mobile";
import SkeletonCard1 from "@/components/ui/movie-card-skeleton-1";
export default function Discover() {
  const isMobile = useIsMobile();
  const { ref, inView } = useInView({
    threshold: 0.5, // triggers when 50% visible
  });
  const [selectedMedia, setSelectedMedia] = useState<"all" | "movie" | "tv">(
    "all"
  );
  const [selectedGenres, setSelectedGenres] = useState<Set<number>>(new Set());
  const [selectedNetwork, setSelectedNetwork] = useState<number | null>(null);
  const [expandYear, setExpandYear] = useState(false);
  const [expandGenre, setExpandGenre] = useState(false);
  const [expandCompanies, setExpandCompanies] = useState(false);
  const [expandLanguage, setExpandLanguage] = useState(false);
  const [expandKeyword, setExpandKeyword] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [toValue, settoValue] = useState<number | null>(null);
  const [fromValue, setfromValue] = useState<number | null>(null);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [maxRating, setMaxRating] = useState<number | null>(null);
  const [yearType, setYearType] = useState(true);
  const CURRENT_YEAR = new Date().getFullYear();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedKeywords, setSelectedKeywords] = useState<Set<string>>(
    new Set()
  );
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const toggleGenre = (id: number) => {
    setSelectedGenres((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleKeywords = (lang: string) => {
    setSelectedKeywords((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(lang)) newSet.delete(lang);
      else newSet.add(lang);
      return newSet;
    });
  };
  const isTrending =
    selectedGenres.size === 0 &&
    !selectedNetwork &&
    !selectedYear &&
    !toValue &&
    !fromValue &&
    !minRating &&
    !maxRating &&
    !selectedLanguage &&
    selectedKeywords.size === 0;
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetDiscoverInfinite<MovieTypes>({
      endpoint: isTrending ? `trending` : `discover`,
      media_type: isTrending ? `${selectedMedia}/day` : selectedMedia,
      params: {
        // page: 1,
        sort_by: "popularity.desc",

        ...(selectedGenres.size > 0 && {
          with_genres: [...selectedGenres].join(","),
        }),

        ...(!yearType &&
          selectedYear != null &&
          (selectedMedia === "tv"
            ? {
                "first_air_date.gte": `${selectedYear}-01-01`,
                "first_air_date.lte": `${selectedYear}-12-31`,
              }
            : {
                "primary_release_date.gte": `${selectedYear}-01-01`,
                "primary_release_date.lte": `${selectedYear}-12-31`,
              })),

        ...(yearType === true &&
          toValue != null &&
          (selectedMedia === "tv"
            ? { "first_air_date.gte": `${toValue}-01-01` }
            : { "primary_release_date.gte": `${toValue}-01-01` })),

        ...(yearType === true &&
          fromValue != null &&
          (selectedMedia === "tv"
            ? { "first_air_date.lte": `${fromValue}-12-31` }
            : { "primary_release_date.lte": `${fromValue}-12-31` })),

        ...(minRating != null && {
          "vote_average.gte": minRating,
        }),

        ...(maxRating != null && {
          "vote_average.lte": maxRating,
        }),

        ...(selectedNetwork &&
          (selectedMedia === "tv"
            ? { with_networks: selectedNetwork }
            : { with_companies: selectedNetwork })),

        ...(selectedLanguage && { with_original_language: selectedLanguage }),
        ...(selectedSort && { sort_by: selectedSort }),
        ...(selectedKeywords.size > 0 && {
          with_keywords: [...selectedKeywords].join(","),
        }),
      },
    });
  const results = data?.pages.flatMap((p) => p.results) ?? [];
  useEffect(() => {
    setSelectedGenres(new Set());
    setSelectedNetwork(null);
    setSelectedKeywords(new Set());
    setSelectedYear(null);
    setSelectedLanguage(null);
    setMinRating(null);
    setMaxRating(null);
    setSelectedSort(null);
    settoValue(null);
    setfromValue(null);
  }, [selectedMedia]);

  const resetFilter = () => {
    setSelectedMedia("all");
    setSelectedGenres(new Set());
    setSelectedNetwork(null);
    setSelectedKeywords(new Set());
    setSelectedYear(null);
    setMinRating(null);
    setMaxRating(null);
    setSelectedLanguage(null);
    setSelectedSort(null);
    settoValue(null);
    setfromValue(null);
  };
  const years = Array.from(
    { length: CURRENT_YEAR - 1999 + 1 },
    (_, i) => 1999 + i
  );

  const safeToYear = toValue ? toValue : 1999;
  const safeFromYear = fromValue ? fromValue : 1999;
  const fromYear = Array.from(
    { length: CURRENT_YEAR - safeToYear + 1 },
    (_, i) => safeToYear + i
  );

  const rating = Array.from({ length: 10 }, (_, i) => i + 1);
  const safeMinRating = minRating ? minRating : 1;
  const safeMaxRating = maxRating ? maxRating : 1;
  const dynamicMaxRating = Array.from(
    { length: 10 - safeMinRating + 1 },
    (_, i) => i + safeMinRating
  );
  useEffect(() => {
    if (safeFromYear < safeToYear && fromValue !== null) {
      setfromValue(safeToYear);
    }
  }, [toValue]);
  useEffect(() => {
    if (safeMaxRating < safeMinRating && maxRating !== null) {
      setMaxRating(safeMinRating);
    }
  }, [minRating]);

  //FIND
  const selectedLanguageLabel = languages.find(
    (lang) => lang.code === selectedLanguage
  )?.name;
  const selectedNetworkLabel = (
    selectedMedia === "movie" ? productionCompanies : tvNetworks
  ).find((network) => network.id === selectedNetwork)?.name;
  //FILTERS
  const selectedGenreLabels = (
    selectedMedia === "movie" ? movieGenres : tvGenres
  ).filter((genre) => selectedGenres.has(genre.id));
  const selectedKeywordLabels = keywordTopics.filter((key) =>
    selectedKeywords.has(key.value)
  );

  // tvNetworks: productionCompanies;

  // const selectedCompanyLabels = keywordTopics.filter((company) =>
  //   selectedNetwork.has(company.)
  // );
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  return (
    <div className=" lg:py-15 py-10 space-y-2 mx-auto lg:w-[90%] w-[95%]">
      <div className="fixed bottom-3 z-40 right-5 flex flex-col lg:gap-2 gap-1 items-end">
        {selectedGenreLabels.map((genre) => (
          <Button
            key={genre.id}
            variant="outline"
            className="backdrop-blur-2xl bg-background/30!"
            onClick={() =>
              setSelectedGenres((prev) => {
                const next = new Set(prev);
                next.delete(genre.id);
                return next;
              })
            }
          >
            {genre.name} <IconX className="size-3.5" />
          </Button>
        ))}
        {selectedKeywordLabels.map((keyword) => (
          <Button
            key={keyword.label}
            variant="outline"
            className="backdrop-blur-2xl bg-background/30!"
            onClick={() =>
              setSelectedKeywords((prev) => {
                const next = new Set(prev);
                next.delete(keyword.value);
                return next;
              })
            }
          >
            {keyword.label} <IconX className="size-3.5" />
          </Button>
        ))}
        {selectedLanguageLabel && (
          <Button
            variant="outline"
            className="backdrop-blur-2xl bg-background/30!"
            onClick={() => setSelectedLanguage(null)}
          >
            {selectedLanguageLabel} <IconX className="size-3.5" />
          </Button>
        )}
        {selectedNetworkLabel && (
          <Button
            variant="outline"
            className="backdrop-blur-2xl bg-background/30!"
            onClick={() => setSelectedNetwork(null)}
          >
            {selectedNetworkLabel} <IconX className="size-3.5" />
          </Button>
        )}
        {(minRating || maxRating) && (
          <div className="flex items-center gap-2">
            {minRating && (
              <Button
                variant="outline"
                className="backdrop-blur-2xl bg-background/30!"
                onClick={() => setMinRating(null)}
              >
                Min - {minRating}
                <IconX className="size-3.5" />
              </Button>
            )}

            {maxRating && (
              <Button
                variant="outline"
                className="backdrop-blur-2xl bg-background/30!"
                onClick={() => setMaxRating(null)}
              >
                Max - {maxRating}
                <IconX className="size-3.5" />
              </Button>
            )}
          </div>
        )}
        {yearType
          ? (fromValue || toValue) && (
              <div className="flex items-center gap-2">
                {fromValue && (
                  <Button
                    variant="outline"
                    className="backdrop-blur-2xl bg-background/30!"
                    onClick={() => setfromValue(null)}
                  >
                    From - {fromValue}
                    <IconX className="size-3.5" />
                  </Button>
                )}

                {toValue && (
                  <Button
                    variant="outline"
                    className="backdrop-blur-2xl bg-background/30!"
                    onClick={() => settoValue(null)}
                  >
                    To - {toValue}
                    <IconX className="size-3.5" />
                  </Button>
                )}
              </div>
            )
          : selectedYear && (
              <Button
                variant="outline"
                className="backdrop-blur-2xl bg-background/30!"
                onClick={() => setSelectedYear(null)}
              >
                {selectedYear}
                <IconX className="size-3.5" />
              </Button>
            )}
        {!isTrending && (
          <Button
            variant="secondary"
            onClick={resetFilter}
            className="lg:size-13 size-11 rounded-full"
          >
            <IconRefresh className="lg:size-6 size-5" />
          </Button>
        )}
        <Drawer
          direction={isMobile ? "bottom" : "left"}
          repositionInputs={false}
        >
          <DrawerTrigger asChild>
            <Button
              variant="destructive"
              className="lg:size-13 size-11 rounded-full"
            >
              <IconFilter2Bolt className="lg:size-6 size-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="">
            <DrawerHeader className="p-2 lg:p-4">
              <DrawerTitle className="text-lg tracking-wide">
                <TitleReusable
                  title="Advanced Filters"
                  description=""
                  Icon={IconFilterPlus}
                  textColor="text-red-700/70"
                  titleSize="lg:text-lg text-base"
                />
              </DrawerTitle>
              <DrawerDescription className="text-left">
                Customize your search using genres, years, networks, and more.
              </DrawerDescription>
            </DrawerHeader>
            <div className="overflow-auto custom-scrollbar space-y-3">
              <div className="lg:p-4 p-2 lg:space-y-3 space-y-1">
                <h1 className="font-medium text-sm lg:text-base">
                  Select Media Type
                </h1>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => setSelectedMedia("all")}
                    variant={
                      selectedMedia === "all" ? "destructive" : "secondary"
                    }
                    className="flex-1"
                    size="xl"
                  >
                    <IconFlameFilled /> Trending
                  </Button>
                  <Button
                    onClick={() =>
                      setSelectedMedia((prev) =>
                        prev === "movie" ? "all" : "movie"
                      )
                    }
                    variant={
                      selectedMedia === "movie" ? "destructive" : "secondary"
                    }
                    className="flex-1"
                    size="xl"
                  >
                    <Film /> Movie
                  </Button>

                  <Button
                    onClick={() =>
                      setSelectedMedia((prev) => (prev === "tv" ? "all" : "tv"))
                    }
                    variant={
                      selectedMedia === "tv" ? "destructive" : "secondary"
                    }
                    className="flex-1"
                    size="xl"
                  >
                    <Tv /> TV Show
                  </Button>
                </div>
              </div>

              <div className="lg:p-4 p-2 flex items-center gap-3">
                <div className="flex-1 h-px bg-border"></div>
                <h1 className="text-sm text-muted-foreground">
                  {selectedMedia === "all"
                    ? "Select a media type to enable filters"
                    : selectedMedia === "movie"
                    ? "Movie Filters"
                    : "TV Show Filters"}
                </h1>
                <div className="flex-1 h-px bg-border"></div>
              </div>

              {/* <div className=" p-4 space-y-3">
                  <h1 className="font-medium text-sm lg:text-base">Sort</h1>
                  <div className="flex flex-wrap gap-2">
                    <Popover>
                      <PopoverTrigger asChild className="flex-1">
                        <Button
                          className="w-full"
                          size="xl"
                          disabled={selectedMedia === "all"}
                          variant="secondary"
                        >
                          Popularity
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="flex gap-2 p-1 border-0">
                        <Button
                          className="flex-1"
                          size="xl"
                          disabled={selectedMedia === "all"}
                          variant="secondary"
                        >
                          Asc
                        </Button>
                        <Button
                          className="flex-1"
                          size="xl"
                          disabled={selectedMedia === "all"}
                          variant="secondary"
                        >
                          Desc
                        </Button>
                      </PopoverContent>
                    </Popover>

                    <Button
                      className="flex-1"
                      size="xl"
                      disabled={selectedMedia === "all"}
                      variant="secondary"
                    >
                      Release Date
                    </Button>
                    <Button
                      className="flex-1"
                      size="xl"
                      disabled={selectedMedia === "all"}
                      variant="secondary"
                    >
                      Vote Average
                    </Button>
                  </div>
                </div> */}

              <div className="lg:p-4 p-2 lg:space-y-3 space-y-1">
                <h1 className="font-medium text-sm lg:text-base">
                  Genres{" "}
                  <span className="text-red-500">
                    {selectedGenres.size === 0
                      ? ""
                      : `(${selectedGenres.size})`}
                  </span>{" "}
                  <span className="text-muted-foreground  text-sm font-normal">
                    (Multi Select Support)
                  </span>
                </h1>
                <div className="flex flex-wrap gap-2">
                  {(selectedMedia === "tv" ? tvGenres : movieGenres)
                    .slice(
                      0,
                      expandGenre
                        ? (selectedMedia === "tv" ? tvGenres : movieGenres)
                            .length
                        : 5
                    )
                    .map((genre) => (
                      <Button
                        key={genre.id}
                        size="xl"
                        className="flex-1"
                        disabled={selectedMedia === "all"}
                        variant={
                          selectedGenres.has(genre.id)
                            ? "destructive"
                            : "secondary"
                        }
                        onClick={() => toggleGenre(genre.id)}
                      >
                        {genre.name}
                      </Button>
                    ))}
                  <Button
                    variant="secondary"
                    size="xl"
                    onClick={() => setExpandGenre((prev) => !prev)}
                  >
                    {expandGenre ? <Minus /> : <Plus />}
                  </Button>
                </div>
              </div>
              <div className=" lg:p-4 p-2 lg:space-y-3 space-y-1">
                <h1 className="font-medium text-sm lg:text-base">
                  Keywords{" "}
                  <span className="text-red-500">
                    {selectedKeywords.size === 0
                      ? ""
                      : `(${selectedKeywords.size})`}
                  </span>
                </h1>
                <div className="flex flex-wrap gap-2">
                  {keywordTopics
                    .slice(0, expandKeyword ? keywordTopics.length : 5)
                    .map((meow) => (
                      <Button
                        variant={
                          selectedKeywords.has(meow.value)
                            ? "destructive"
                            : "secondary"
                        }
                        className="flex-1"
                        key={meow.value}
                        size="xl"
                        onClick={() => toggleKeywords(meow.value)}
                        disabled={selectedMedia === "all"}
                      >
                        {meow.label}
                      </Button>
                    ))}
                  <Button
                    variant="secondary"
                    size="xl"
                    onClick={() => setExpandKeyword((prev) => !prev)}
                  >
                    {expandKeyword ? <Minus /> : <Plus />}
                  </Button>
                </div>
              </div>

              <div className="lg:p-4 p-2 lg:space-y-3 space-y-1">
                <h1 className="font-medium text-sm lg:text-base flex gap-3 items-end justify-between">
                  {yearType ? " Year Range" : "Released Year"}
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => setYearType((prev) => !prev)}
                  >
                    {yearType ? <Calendar /> : <IconTransfer />}
                  </Button>
                </h1>
                {yearType ? (
                  <div className="flex gap-2 items-center">
                    <CommandComponent
                      value={toValue}
                      setValue={settoValue}
                      years={years}
                      placeholder="To"
                      disabled={selectedMedia === "all"}
                      label="year"
                    />
                    <Separator className="w-10! bg-border" />
                    <CommandComponent
                      value={fromValue}
                      setValue={setfromValue}
                      years={fromYear}
                      placeholder="From"
                      disabled={selectedMedia === "all"}
                      label="year"
                    />
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {Array.from(
                      { length: CURRENT_YEAR - 1999 + 1 },
                      (_, i) => 1999 + i
                    )
                      .slice(expandYear ? 0 : 21)
                      .map((year) => (
                        <Button
                          key={year}
                          size="xl"
                          className="flex-1 tracking-wide"
                          disabled={selectedMedia === "all"}
                          // use selectedYear to determine variant
                          variant={
                            selectedYear === year ? "destructive" : "secondary"
                          }
                          onClick={
                            () =>
                              setSelectedYear((prev) =>
                                prev === year ? null : year
                              ) // toggle
                          }
                        >
                          {year}
                        </Button>
                      ))}
                    <Button
                      onClick={() => setExpandYear((prev) => !prev)}
                      size="xl"
                      variant="secondary"
                    >
                      {expandYear ? <Minus /> : <Plus />}
                    </Button>
                  </div>
                )}
              </div>

              <div className="lg:p-4 p-2 lg:space-y-3 space-y-1">
                <h1 className="font-medium text-sm lg:text-base flex gap-3 items-end justify-between">
                  Rating Range
                </h1>
                <div className="flex gap-2 items-center">
                  <CommandComponent
                    value={minRating}
                    setValue={setMinRating}
                    years={rating}
                    placeholder="Min"
                    disabled={selectedMedia === "all"}
                    label="rating"
                  />
                  <Separator className="w-10! bg-border" />
                  <CommandComponent
                    value={maxRating}
                    setValue={setMaxRating}
                    years={dynamicMaxRating}
                    placeholder="Max"
                    disabled={selectedMedia === "all"}
                    label="rating"
                  />
                </div>
              </div>
              <div className=" lg:p-4 p-2 lg:space-y-3 space-y-1">
                <h1 className="font-medium text-sm lg:text-base">
                  Companies{" "}
                  <span className="text-red-500">
                    {!selectedNetwork ? "" : "(1)"}
                  </span>
                </h1>
                <div className="flex flex-wrap gap-2">
                  {(selectedMedia === "tv" ? tvNetworks : productionCompanies)
                    .slice(
                      0,
                      expandCompanies
                        ? (selectedMedia === "tv"
                            ? tvNetworks
                            : productionCompanies
                          ).length
                        : 4
                    )
                    .map((network) => (
                      <Button
                        variant={
                          selectedNetwork === network.id
                            ? "destructive"
                            : "secondary"
                        }
                        className="flex-1"
                        key={network.id}
                        size="xl"
                        disabled={selectedMedia === "all"}
                        onClick={() =>
                          setSelectedNetwork((prev) =>
                            prev === network.id ? null : network.id
                          )
                        }
                      >
                        {network.name}
                      </Button>
                    ))}
                  <Button
                    onClick={() => setExpandCompanies((prev) => !prev)}
                    size="xl"
                    variant="secondary"
                  >
                    {expandCompanies ? <Minus /> : <Plus />}
                  </Button>
                </div>
              </div>
              <div className="lg:p-4 p-2 lg:space-y-3 space-y-1">
                <h1 className="font-medium text-sm lg:text-base">
                  Languages{" "}
                  <span className="text-red-500">
                    {!selectedLanguage ? "" : `(1)`}
                  </span>
                </h1>
                <div className="flex flex-wrap gap-2">
                  {languages
                    .slice(0, expandLanguage ? languages.length : 5)
                    .map((lang) => (
                      <Button
                        key={lang.code}
                        size="xl"
                        variant={
                          selectedLanguage === lang.code
                            ? "destructive"
                            : "secondary"
                        }
                        onClick={() =>
                          setSelectedLanguage((prev) =>
                            prev === lang.code ? null : lang.code
                          )
                        }
                        disabled={selectedMedia === "all"}
                        className="flex-1"
                      >
                        {lang.name}
                      </Button>
                    ))}
                  <Button
                    variant="secondary"
                    size="xl"
                    onClick={() => setExpandLanguage((prev) => !prev)}
                  >
                    {expandLanguage ? <Minus /> : <Plus />}
                  </Button>
                </div>
              </div>
            </div>
            <DrawerFooter className=" grid grid-cols-2">
              <Button
                className=""
                onClick={resetFilter}
                disabled={selectedMedia === "all"}
              >
                Reset <IconRefresh />
              </Button>

              <DrawerClose asChild>
                <Button variant="outline" className="">
                  Close <IconX />
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      {/* <div className="flex justify-end gap-5 mb-3">
        <Button variant="secondary">
          <IconCategoryPlus />
          Select Filter
        </Button>
      </div> */}
      {/* <h1 className="sectionName uppercase">
        {selectedGenres.size === 0 ? "DISCOVER" : selectedGenreLabel}
      </h1> */}
      <h1 className=" uppercase  mask-[linear-gradient(to_bottom,black_0%,transparent_85%)] lg:text-7xl text-5xl font-bold text-red-700  translate-y-3 lg:tracking-tighter text-center">
        {selectedMedia === "all"
          ? "TRENDING"
          : selectedMedia === "movie"
          ? "MOVIE"
          : "TV SHOW"}
      </h1>

      <div className="grid lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-4 grid-cols-3 lg:gap-4 gap-2">
        {/* {data?.pages.map((page, idx) =>
          page.results.length === 0 ? (
            <div
              key={`empty-${idx}`}
              className="col-span-7 flex flex-col justify-center items-center gap-4 py-20"
            >
              <span className="bg-popover p-2 rounded-md">
                <IconMovieOff className="size-10" />
              </span>
              <div className="text-center">
                <h1 className="text-lg font-medium"> No data found.</h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Try another filter combination.
                </p>
              </div>
            </div>
          ) : (
            page.results.map((meow) => (
              <MovieCard
                key={meow.id}
                movie={meow}
                media_type={isTrending ? meow.media_type : selectedMedia}
              />
            ))
          )
        )} */}

        {isLoading ? (
          [...Array(7)].map((_, i) => <SkeletonCard1 key={i} />)
        ) : results.length === 0 ? (
          <div className="col-span-7 flex flex-col justify-center items-center gap-4 py-20">
            <span className="bg-popover p-2 rounded-md">
              <IconMovieOff className="size-10" />
            </span>
            <div className="text-center">
              <h1 className="text-lg font-medium"> No data found.</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Try another filter combination.
              </p>
            </div>
          </div>
        ) : (
          results.map((result) => (
            <MovieCard
              key={result.id}
              movie={result}
              media_type={isTrending ? result.media_type : selectedMedia}
            />
          ))
        )}
        {[...Array(7)].map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="flex-10" /> {/* biggest */}
            <div className="flex-1 flex flex-col gap-1">
              <Skeleton className="flex-1 w-1/2" /> {/* smaller */}
              <Skeleton className="flex-[0.8] w-1/3" /> {/* smaller */}
            </div>
          </div>
        ))}
        {isFetchingNextPage &&
          [...Array(7)].map((_, i) => (
            <div key={i} className="">
              <Skeleton className="aspect-2/3" />
              <div className="mt-3 space-y-1">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}
      </div>
      <div ref={ref} className="grid place-items-center">
        {isFetchingNextPage && (
          <p className="flex gap-2 animate-pulse text-muted-foreground">
            fetching data...
            <IconLoader className="animate-spin" />
          </p>
        )}
      </div>
    </div>
  );
}

function CommandComponent({
  // open,
  // setOpen,
  value,
  years,
  setValue,
  placeholder,
  disabled,
  label,
}: {
  // open: boolean;
  // setOpen: (open: boolean) => void;
  value: number | null;
  years: number[];
  setValue: (value: number | null) => void;
  placeholder: string;
  disabled: boolean;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="flex-1">
        <Button
          variant={!value ? "secondary" : "destructive"}
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
          size="xl"
        >
          {value !== null ? value : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          <CommandInput
            placeholder={`Search ${label}...`}
            className="h-9 capitalize"
          />
          <CommandList>
            <CommandEmpty>{`No ${label} found.`}</CommandEmpty>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setValue(null);
                  setOpen(false);
                }}
              >
                Reset...
              </CommandItem>
              {years.map((year) => (
                <CommandItem
                  key={year}
                  value={String(year)}
                  onSelect={() => {
                    setValue(year);
                    setOpen(false);
                  }}
                >
                  {year}{" "}
                  {label === "rating" && <IconCarambolaFilled color="yellow" />}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === year ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
const languages = [
  { code: "en", name: "English" },
  { code: "tl", name: "Filipino" },
  { code: "ko", name: "Korean" },
  { code: "ja", name: "Japanese" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "es", name: "Spanish" },
  { code: "it", name: "Italian" },
  { code: "zh", name: "Chinese" },
  { code: "hi", name: "Hindi" },
  { code: "ru", name: "Russian" },
  { code: "pt", name: "Portuguese" },
  { code: "sv", name: "Swedish" },
  { code: "nl", name: "Dutch" },
  { code: "tr", name: "Turkish" },
  { code: "pl", name: "Polish" },
  { code: "da", name: "Danish" },
  { code: "no", name: "Norwegian" },
  { code: "fi", name: "Finnish" },
  { code: "he", name: "Hebrew" },
  { code: "ar", name: "Arabic" },
];
