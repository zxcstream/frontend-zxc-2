"use client";
import { useReusableApi } from "@/api/tanstack-query";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  EffectFade,
  Navigation,
  Pagination,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import { useLandingSwiper } from "@/store/landing-swiper";
import { useSearchParams } from "next/navigation";
import SkeletonLanding from "./skeleton";
import LandingContent from "./content";
import { useEffect, useMemo, useRef } from "react";

export default function LandingPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("query");
  const isSearching = Boolean(search);

  const { index, setIndex } = useLandingSwiper();
  const custom_list = useMemo(() => {
    return shuffleArray([
      { id: 1062722, media_type: "movie" },
      { id: 1242898, media_type: "movie" },
      { id: 1402, media_type: "tv" },
      { id: 95557, media_type: "tv" },
      { id: 114410, media_type: "tv" },
      { id: 14836, media_type: "movie" },
    ]);
  }, []);

  const swiperRef = useRef<SwiperType | null>(null);
  const query = useReusableApi({
    custom_list,
    activeIndex: index,
    prefetchRange: 1,
  });
  useEffect(() => {
    if (!swiperRef.current) return;

    if (isSearching) {
      swiperRef.current.autoplay.stop();
    } else {
      swiperRef.current.autoplay.start();
    }
  }, [isSearching]);
  return (
    <Swiper
      spaceBetween={30}
      effect={"fade"}
      navigation={true}
      keyboard={{
        enabled: true,
      }}
      pagination={{
        type: "progressbar",
      }}
      onSwiper={(s) => (swiperRef.current = s)}
      autoplay={{
        delay: 20000,
        disableOnInteraction: false,
      }}
      modules={[EffectFade, Navigation, Pagination, Keyboard, Autoplay]}
      initialSlide={index}
      onSlideChange={(s) => setIndex(s.activeIndex)}
    >
      {query.map((meow, idx) => {
        const data = meow.data;
        const loading = meow.isLoading;
        if (!data || loading) {
          return (
            <SwiperSlide key={`skeleton-${idx}`}>
              <SkeletonLanding isSearching={isSearching} />
            </SwiperSlide>
          );
        }
        return (
          <SwiperSlide>
            {({ isActive }) => (
              <LandingContent
                isSearching={isSearching}
                isActive={isActive}
                data={data}
              />
            )}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}
