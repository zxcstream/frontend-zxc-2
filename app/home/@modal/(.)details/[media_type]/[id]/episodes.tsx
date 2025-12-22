import { useTvSeason } from "@/api/get-seasons";
import { Button } from "@/components/ui/button";
import { IMAGE_BASE_URL } from "@/constants/tmdb";
import { useSeasonStore } from "@/store/season";
import { useSpoilerStore } from "@/store/settings-store";
import { ChevronDown, Eye, EyeOff, TextSearch } from "lucide-react";
import { useState } from "react";
import CircularProgress from "./circular-progress";
import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";
import TitleReusable from "@/components/ui/title";
import Link from "next/link";
import { useLastPlayed } from "@/store/now-playing-store";
export default function Episodes({ id }: { id: number }) {
  const { getSeasonSelect } = useSeasonStore();
  const { activateSpoiler, setActivateSpoiler } = useSpoilerStore();

  const savedSeason = getSeasonSelect(id);
  const season_number = savedSeason?.number ?? 1;
  const query = useTvSeason({ id, season_number, media_type: "tv" });
  const [seemore, setSeeMore] = useState(false);
  const episodes = query.data?.episodes ?? [];

  const loading = query.isLoading;

  const setLastPlayed = useLastPlayed((s) => s.setLastPlayed);
  const setMainPlayerActive = useLastPlayed((s) => s.setMainPlayerActive);
  const lastId = useLastPlayed((s) => s.lastId);
  const lastMediaType = useLastPlayed((s) => s.media_type);
  const lastSeason = useLastPlayed((s) => s.season);
  const lastEpisode = useLastPlayed((s) => s.episode);
  const isMainPlayerActive = useLastPlayed((s) => s.isMainPlayerActive);

  {
    /* <button class="hero__down" aria-label="scroll down">
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 12 6.9"
    enable-background="new 0 0 12 6.9"
    xml:space="preserve"
  >
    {" "}
    <path
      fill="#0C1B27"
      d="M0.2,0.1C0.3,0,0.4,0,0.5,0l0.8,0c0.1,0,0.2,0,0.3,0.1c0.1,0.1,0.1,0.2,0.1,0.3v0.8c0,0.1,0,0.2,0.1,0.3
	C2,1.7,2.1,1.7,2.2,1.7H3c0.1,0,0.2,0.1,0.3,0.1C3.5,2,3.5,2.1,3.5,2.2V3c0,0.1,0,0.2,0.1,0.3c0.1,0.1,0.2,0.1,0.3,0.1h0.8
	c0.1,0,0.2,0.1,0.3,0.1c0.1,0.1,0.1,0.2,0.1,0.3v0.8c0,0.1,0.1,0.2,0.1,0.3c0.1,0.1,0.2,0.1,0.3,0.1h0.8c0.1,0,0.2,0,0.3-0.1
	c0.1-0.1,0.1-0.2,0.1-0.3V3.9c0-0.1,0.1-0.2,0.1-0.3c0.1-0.1,0.2-0.1,0.3-0.1h0.8c0.1,0,0.2,0,0.3-0.1C8.6,3.2,8.7,3.1,8.7,3V2.2
	c0-0.1,0.1-0.2,0.1-0.3C8.9,1.8,9,1.7,9.1,1.7h0.8c0.1,0,0.2,0,0.3-0.1c0.1-0.1,0.1-0.2,0.1-0.3V0.4c0-0.1,0-0.2,0.1-0.3
	C10.6,0,10.7,0,10.8,0l0.8,0c0.1,0,0.2,0,0.3,0.1C12,0.2,12,0.3,12,0.4v0.8c0,0.1-0.1,0.2-0.1,0.3c-0.1,0.1-0.2,0.1-0.3,0.1h-0.8
	c-0.1,0-0.2,0.1-0.3,0.1c-0.1,0.1-0.1,0.2-0.1,0.3V3c0,0.1-0.1,0.2-0.1,0.3C10.1,3.4,10,3.4,9.9,3.4H9.1c-0.1,0-0.2,0.1-0.3,0.1
	C8.7,3.7,8.6,3.8,8.6,3.9v0.8c0,0.1,0,0.2-0.1,0.3C8.4,5.1,8.3,5.2,8.2,5.2H7.3C7.2,5.2,7.1,5.2,7,5.3C6.9,5.4,6.9,5.5,6.9,5.6v0.8
	c0,0.1,0,0.2-0.1,0.3C6.7,6.8,6.6,6.9,6.4,6.9H5.6c-0.1,0-0.2-0.1-0.3-0.1C5.2,6.6,5.2,6.5,5.2,6.4V5.6c0-0.1,0-0.2-0.1-0.3
	C4.9,5.2,4.8,5.2,4.7,5.2H3.9c-0.1,0-0.2,0-0.3-0.1C3.5,4.9,3.4,4.8,3.4,4.7V3.9c0-0.1,0-0.2-0.1-0.3C3.2,3.5,3.1,3.4,3,3.4H2.2
	c-0.1,0-0.2,0-0.3-0.1C1.8,3.2,1.7,3.1,1.7,3V2.2c0-0.1,0-0.2-0.1-0.3C1.5,1.8,1.4,1.7,1.3,1.7H0.4c-0.1,0-0.2,0-0.3-0.1
	C0,1.5,0,1.4,0,1.3l0-0.8C0,0.3,0,0.2,0.2,0.1L0.2,0.1z"
    ></path>{" "}
  </svg>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 12 6.9"
    enable-background="new 0 0 12 6.9"
    xml:space="preserve"
  >
    {" "}
    <path
      fill="#0C1B27"
      d="M0.2,0.1C0.3,0,0.4,0,0.5,0l0.8,0c0.1,0,0.2,0,0.3,0.1c0.1,0.1,0.1,0.2,0.1,0.3v0.8c0,0.1,0,0.2,0.1,0.3
	C2,1.7,2.1,1.7,2.2,1.7H3c0.1,0,0.2,0.1,0.3,0.1C3.5,2,3.5,2.1,3.5,2.2V3c0,0.1,0,0.2,0.1,0.3c0.1,0.1,0.2,0.1,0.3,0.1h0.8
	c0.1,0,0.2,0.1,0.3,0.1c0.1,0.1,0.1,0.2,0.1,0.3v0.8c0,0.1,0.1,0.2,0.1,0.3c0.1,0.1,0.2,0.1,0.3,0.1h0.8c0.1,0,0.2,0,0.3-0.1
	c0.1-0.1,0.1-0.2,0.1-0.3V3.9c0-0.1,0.1-0.2,0.1-0.3c0.1-0.1,0.2-0.1,0.3-0.1h0.8c0.1,0,0.2,0,0.3-0.1C8.6,3.2,8.7,3.1,8.7,3V2.2
	c0-0.1,0.1-0.2,0.1-0.3C8.9,1.8,9,1.7,9.1,1.7h0.8c0.1,0,0.2,0,0.3-0.1c0.1-0.1,0.1-0.2,0.1-0.3V0.4c0-0.1,0-0.2,0.1-0.3
	C10.6,0,10.7,0,10.8,0l0.8,0c0.1,0,0.2,0,0.3,0.1C12,0.2,12,0.3,12,0.4v0.8c0,0.1-0.1,0.2-0.1,0.3c-0.1,0.1-0.2,0.1-0.3,0.1h-0.8
	c-0.1,0-0.2,0.1-0.3,0.1c-0.1,0.1-0.1,0.2-0.1,0.3V3c0,0.1-0.1,0.2-0.1,0.3C10.1,3.4,10,3.4,9.9,3.4H9.1c-0.1,0-0.2,0.1-0.3,0.1
	C8.7,3.7,8.6,3.8,8.6,3.9v0.8c0,0.1,0,0.2-0.1,0.3C8.4,5.1,8.3,5.2,8.2,5.2H7.3C7.2,5.2,7.1,5.2,7,5.3C6.9,5.4,6.9,5.5,6.9,5.6v0.8
	c0,0.1,0,0.2-0.1,0.3C6.7,6.8,6.6,6.9,6.4,6.9H5.6c-0.1,0-0.2-0.1-0.3-0.1C5.2,6.6,5.2,6.5,5.2,6.4V5.6c0-0.1,0-0.2-0.1-0.3
	C4.9,5.2,4.8,5.2,4.7,5.2H3.9c-0.1,0-0.2,0-0.3-0.1C3.5,4.9,3.4,4.8,3.4,4.7V3.9c0-0.1,0-0.2-0.1-0.3C3.2,3.5,3.1,3.4,3,3.4H2.2
	c-0.1,0-0.2,0-0.3-0.1C1.8,3.2,1.7,3.1,1.7,3V2.2c0-0.1,0-0.2-0.1-0.3C1.5,1.8,1.4,1.7,1.3,1.7H0.4c-0.1,0-0.2,0-0.3-0.1
	C0,1.5,0,1.4,0,1.3l0-0.8C0,0.3,0,0.2,0.2,0.1L0.2,0.1z"
    ></path>{" "}
  </svg>
</button>; */
  }

  return (
    <div className="space-y-3 ">
      <TitleReusable
        title={`${savedSeason?.name} Episodes`}
        description={`${episodes.length} episodes`}
      />
      <div className="flex items-end justify-end">
        <Button
          variant="ghost"
          onClick={() => setActivateSpoiler(!activateSpoiler)}
        >
          {activateSpoiler ? (
            <>
              <EyeOff className="w-4 h-4" />
              <span className="text-sm font-medium">Hide Spoilers</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">Show Spoilers</span>
            </>
          )}
        </Button>

        {/* <div className="inline-flex items-center gap-2">
          <Switch id="auto-hide" className="rounded-sm [&_span]:rounded" />
          <label htmlFor="auto-hide" className="text-sm text-muted-foreground">
            Auto hide
          </label>
        </div> */}
      </div>

      {loading ? (
        <div className=" flex-1 grid place-items-center">
          <Tailspin size="35" stroke="3.5" speed="1" color="white" />
        </div>
      ) : episodes.length === 0 ? (
        <div className=" flex-1 grid place-items-center">
          <div className="flex flex-col items-center gap-5">
            <span className="p-3 bg-card border-2 rounded-full">
              <TextSearch />
            </span>
            <div className="text-center">
              <p className="">No data found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try another keyword.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {episodes.slice(0, seemore ? episodes.length : 6).map((episode) => (
            <Link
              key={episode.id}
              className="group "
              href={`/home/watch/tv/${id}/${season_number}/${episode.episode_number}`}
              onClick={() => {
                setLastPlayed({
                  id: id,
                  media_type: "tv",
                  season: season_number,
                  episode: episode.episode_number,
                });
                setMainPlayerActive(true);
              }}
            >
              {/* Image */}
              <div className="relative aspect-video  max-w-65 lg:max-w-full mb-3 bg-neutral-900 rounded overflow-hidden">
                <div className="absolute top-0 -left-2 flex items-center z-20">
                  {id === lastId &&
                    lastEpisode === episode.episode_number &&
                    lastSeason === season_number && (
                      <div
                        className={`flex items-center justify-center text-gray-200 tracking-wide font-medium text-sm pl-5 pr-6    py-1.5 bg-linear-to-br bg-background/50 backdrop-blur-md
                         `}
                        style={{
                          clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                        }}
                      >
                        {isMainPlayerActive ? "Playing Now" : "Last Watched"}
                      </div>
                    )}
                </div>
                {episode.still_path ? (
                  <>
                    <img
                      src={`${IMAGE_BASE_URL}/w780${episode.still_path}`}
                      alt={episode.name}
                      className={`w-full h-full object-cover group-hover:opacity-80 transition-opacity ${
                        !activateSpoiler ? "blur-2xl" : ""
                      }`}
                    />
                    {!activateSpoiler && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="text-center">
                          <EyeOff className="w-8 h-8 mx-auto mb-2 text-white/80" />
                          <p className="text-white/80 text-sm font-medium">
                            Spoiler Hidden
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-5xl font-bold text-neutral-800">
                      {episode.episode_number}
                    </span>
                  </div>
                )}

                {/* Rating Badge */}
                {episode.vote_average > 0 && (
                  <CircularProgress voteAverage={episode.vote_average} />
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className=" font-semibold lg:text-lg mb-1 lg:line-clamp-2 line-clamp-1 group-hover:text-neutral-300 transition-colors">
                  {!activateSpoiler && "Episode"} {episode.episode_number}.{" "}
                  {activateSpoiler && episode.name}
                </h3>

                <div className="flex items-center gap-2 lg:text-sm text-xs text-neutral-500 mb-2">
                  {episode.air_date && (
                    <span>
                      {new Date(episode.air_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  )}
                  {episode.runtime && (
                    <>
                      <span>•</span>
                      <span>{episode.runtime} min</span>
                    </>
                  )}
                </div>

                {episode.overview && activateSpoiler && (
                  <p className="text-sm text-muted-foreground lg:line-clamp-3 line-clamp-2 leading-relaxed ">
                    {episode.overview}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {episodes.length > 6 && (
        <div className="flex justify-center items-center gap-1">
          <Button variant="link" onClick={() => setSeeMore(!seemore)}>
            {seemore ? "Show Less" : "Show More"}{" "}
            <ChevronDown
              className={`${seemore ? "rotate-180" : ""} transition-transform`}
            />
          </Button>
        </div>
      )}
      {/* Empty State */}
    </div>
  );
}
