"use client";
import { movie_endpoints } from "@/constants/movie-endpoints";
import ReusableSwiper from "../reusable-display";

export default function Home() {
  return movie_endpoints.map((tv) => (
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
