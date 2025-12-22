import { Button } from "@/components/ui/button";
import { IMAGE_BASE_URL } from "@/constants/tmdb";
import { MovieTypes } from "@/types/movie-by-id";
import { motion } from "framer-motion";
import { Bookmark, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/zxczxc.svg";
import { useIsMobile } from "@/hook/use-mobile";
export default function LandingContent({
  isSearching,
  isActive,
  data,
}: {
  isSearching: boolean;
  isActive: boolean;
  data: MovieTypes;
}) {
  const isMobile = useIsMobile();
  return (
    <motion.div
      animate={{
        height: isSearching ? 0 : isMobile ? "70vh" : "100vh",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="lg:max-h-dvh max-h-[70vh] grid lg:grid-cols-4 relative overflow-hidden bg-background"
    >
      {/*IMAGE */}
      <motion.div
        initial={{ scale: 1, opacity: 0 }}
        animate={{
          scale: isActive ? 1.03 : 1,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative col-span-3  overflow-hidden lg:min-h-lvh min-h-[70lvh]"
      >
        <img
          src={`${IMAGE_BASE_URL}/original${data.backdrop_path}`}
          alt={data.title || data.name}
          className="object-cover  
               lg:mask-[linear-gradient(to_right,black_70%,transparent_100%)]
               lg:mask-size-[100%_100%] h-full w-full"
          // fill
          // sizes="75vw"
          // quality={75}
          // priority={isActive}
        />{" "}
      </motion.div>
      {/*IMAGE */}
      <div className="absolute inset-0 bg-linear-to-b lg:from-transparent from-background/80 via-transparent to-background pointer-events-none " />
      <div className="absolute flex items-center lg:justify-end inset-x-0 bottom-0  lg:p-20 p-3.5  ">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:max-w-[38%]"
        >
          <motion.div
            initial={{ scale: 1, opacity: 0 }}
            animate={{
              scale: isActive ? 1.03 : 1,
              opacity: isActive ? 1 : 0,
            }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:mb-8 mb-3 lg:max-w-md max-w-50   overflow-hidden"
          >
            {data.images.logos.length === 0 ? (
              <h1 className="lg:text-6xl text-4xl  font-bold">
                {data.title || data.name}
              </h1>
            ) : (
              <img
                src={`${IMAGE_BASE_URL}/w780${
                  data.images?.logos?.find((meow) => meow.iso_639_1 === "en")
                    ?.file_path
                }`}
                alt={data.title || data.name}
                className=" w-full lg:max-h-60 max-h-30 object-contain object-left"
              />
            )}
          </motion.div>

          <div className="flex items-center lg:gap-6 gap-3 lg:mb-8 mb-3">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-semibold  ">
                {data.vote_average.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">/ 10</div>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <div className="text-muted-foreground">
              {new Date(data.release_date || data.first_air_date).getFullYear()}
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed lg:mb-10 mb-5 lg:line-clamp-4 line-clamp-2 lg:text-base text-sm">
            {data.overview}
          </p>
          <div className="flex lg:gap-4 gap-2">
            <Button
              asChild
              size="xl"
              variant="accent"
              className="active:scale-95"
            >
              <Link
                href={`/home/details/${data.media_type}/${data.id}`}
                scroll={false}
                prefetch={true}
              >
                <Play className=" fill-current" /> Play Now
              </Link>
            </Button>

            <Button size="xl" variant="outline">
              Add to List <Bookmark strokeWidth={3} />
            </Button>
          </div>
        </motion.div>
      </div>

      {/*IMAGE */}
      {/* <span className="absolute bottom-10 left-1/2 z-10 h-9 w-6 -translate-x-1/2 rounded-full border border-foreground/80 flex items-start justify-center pt-1 animate-bounce opacity-80 shadow-md">
        <span className="h-2.5 w-px bg-foreground  border-foreground/80 rounded-full"></span>
      </span> */}
    </motion.div>
  );
}
