"use client";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import logo from "@/assets/zxczxc.svg";
export default function Provider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [queryClient] = useState(() => new QueryClient());
  // useEffect(() => {
  //   const unsubscribe = queryClient.getQueryCache().subscribe(() => {
  //     const keys = queryClient
  //       .getQueryCache()
  //       .getAll()
  //       .map((q) => q.queryKey);

  //     console.log("🔄 Cache updated:", keys);
  //   });

  //   return unsubscribe;
  // }, [queryClient]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        })
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    }
  }, []);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return (
      <AnimatePresence mode="wait">
        {!isMounted && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-black backdrop-blur-2xl gap-4"
          >
            <img src={logo.src} className="size-14 animate-pulse" alt="" />

            <Tailspin size="20" stroke="3" speed="0.9" color="white" />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
