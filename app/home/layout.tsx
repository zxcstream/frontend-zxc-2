"use client";

import LandingPage from "@/components/landing-components/landing-page";
import { ReactNode, useEffect } from "react";
import ContentState from "../state";
import Header from "../header";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import SearchResult from "@/components/search-components/search-results";
import { useQueryClient } from "@tanstack/react-query";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { useLastPlayed } from "@/store/now-playing-store";

interface DashboardLayoutProps {
  children: ReactNode;
  modal: ReactNode;
  player: ReactNode;
}

export default function Home({
  children,
  modal,
  player,
}: DashboardLayoutProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const isSearching = Boolean(query);
  const pathname = usePathname();

  const isBrowse = pathname.startsWith("/home/browse");
  const setMainPlayerActive = useLastPlayed((s) => s.setMainPlayerActive);
  useEffect(() => {
    if (!pathname.startsWith("/home/watch")) {
      setMainPlayerActive(false);
    }
  }, [pathname]);
  return (
    <>
      {!isBrowse && (
        <>
          <Header />
          <LandingPage />
        </>
      )}
      <AnimatePresence mode="wait">
        {isSearching ? (
          <motion.div
            key="search"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.2,
                ease: "easeInOut",
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                delay: 0.1,
                ease: "easeInOut",
              },
            }}
          >
            <SearchResult />
          </motion.div>
        ) : (
          <>
            {!isBrowse && <ContentState />}

            {children}
          </>
        )}
      </AnimatePresence>

      {modal}
      {player}

      <ScrollToTop />
    </>
  );
}
