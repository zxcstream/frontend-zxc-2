"use client";
import { anime_endpoints } from "@/constants/movie-endpoints";
import ReusableSwiper from "@/app/reusable-display";

export default function Anime() {
  return anime_endpoints.map((tv) => (
    <ReusableSwiper
      key={tv.id}
      id={tv.id}
      endpoint={tv.endpoint}
      params={tv.params}
      displayName={tv.displayName}
      media_type={tv.media_type}
      label={tv.label}
      type={tv.type}
    />
  ));
}
