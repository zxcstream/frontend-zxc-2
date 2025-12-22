import { useIsMobile } from "@/hook/use-mobile";
import { GenreTypes } from "@/types/movie-by-id";

export default function Genres({ genres }: { genres: GenreTypes[] }) {
  const isMobile = useIsMobile();
  return genres.slice(0, isMobile ? 1 : 3).map((genre) => (
    <p
      key={genre.id}
      className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground"
    >
      {genre.name}
    </p>
  ));
}
