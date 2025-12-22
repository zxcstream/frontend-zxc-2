"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  IconBadgeAdOff,
  IconBrandNetflix,
  IconCloudCog,
  IconCloudFilled,
  IconRefresh,
  IconSettings2,
  IconTransferVertical,
} from "@tabler/icons-react";
import logo from "@/assets/zxczxc.svg";
import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";
import { Switch } from "@/components/ui/switch";
import { AnimatePresence, motion } from "motion/react";

export default function WatchMode() {
  const router = useRouter();
  const { params } = useParams();
  const media_type = String(params?.[0]);
  const id = Number(params?.[1]);
  const season = Number(params?.[2]) || 1;
  const episode = Number(params?.[3]) || 1;
  const [open, setOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [reloadCounter, setReloadCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const handleCloseDrawer = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setTimeout(() => router.back(), 300);
    }
  };
  const [selectedServer, setSelectedServer] = useState(1);
  const [sandbox, setSandbox] = useState(false);
  const servers = [
    {
      name: "Main Server",
      hasAds: false,
      sandboxSupport: true,
      embedLink: `https://zxcstream.xyz/player/${media_type}/${id}${
        media_type === "tv" ? `/${season}/${episode}` : ""
      }`,
    },
    {
      name: "Backup ",
      hasAds: false,
      sandboxSupport: true,
      embedLink: `https://zxcstream.xyz/embed/${media_type}/${id}${
        media_type === "tv" ? `/${season}/${episode}` : ""
      }`,
    },
    {
      name: "Server 1",
      hasAds: true,
      sandboxSupport: false,
      embedLink: `https://vidsrc-embed.ru/embed/${media_type}/${id}${
        media_type === "tv" ? `/${season}/${episode}` : ""
      }`,
    },
    {
      name: "Server 2",
      hasAds: true,
      sandboxSupport: false,
      embedLink: `https://vidsrc.cc/v2/embed/${media_type}/${id}${
        media_type === "tv" ? `/${season}/${episode}` : ""
      }?autoPlay=true`,
    },
    {
      name: "Server 3",
      hasAds: true,
      sandboxSupport: false,
      embedLink: `https://player.videasy.net/${media_type}/${id}${
        media_type === "tv"
          ? `/${season}/${episode}?nextEpisode=true&autoplayNextEpisode=true&episodeSelector=true&overlay=true&color=FF0000`
          : ""
      }`,
    },
    {
      name: "Server 4",
      hasAds: true,
      sandboxSupport: false,
      embedLink: `https://111movies.com/${media_type}/${id}${
        media_type === "tv" ? `/${season}/${episode}` : ""
      }`,
    },
    {
      name: "Server 5",
      hasAds: true,
      sandboxSupport: false,
      embedLink: `https://vidfast.pro/${media_type}/${id}${
        media_type === "tv" ? `/${season}/${episode}` : ""
      }`,
    },
    {
      name: "Server 6",
      hasAds: true,
      sandboxSupport: false,
      embedLink: `https://vidnest.fun/${media_type}/${id}${
        media_type === "tv" ? `/${season}/${episode}` : ""
      }`,
    },

    // https://play.xpass.top/e/tv/82596/5/10?autostart=true
  ];

  const serversWithId = servers.map((server, index) => ({
    id: index + 1,
    ...server,
  }));
  const activeServer = serversWithId.find(
    (server) => server.id === selectedServer
  );

  useEffect(() => {
    setIsLoading(true);
  }, [selectedServer, sandbox]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton={false}>
        <DialogHeader className="sr-only">
          <DialogTitle>PLAYER</DialogTitle>
          <DialogDescription>zxc[stream] player</DialogDescription>
        </DialogHeader>
        <div className="relative h-full w-full">
          <div className="absolute lg:top-10 top-5 lg:left-8 left-2 flex items-center gap-1 z-20">
            <Button
              variant="outline"
              size="xl"
              onClick={() => handleCloseDrawer(false)}
              className="backdrop-blur-2xl"
            >
              <ArrowLeft /> Back
            </Button>

            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="xl"
                  className="backdrop-blur-2xl"
                >
                  <IconCloudCog /> {activeServer?.name}
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="mt-2 lg:ml-7 ml-1 border-none grid lg:grid-cols-3 grid-cols-2 gap-1 p-1 bg-background/30 backdrop-blur-2xl"
                align="end"
              >
                <Button
                  variant="outline"
                  size="xl"
                  asChild
                  className="col-span-3 flex items-center justify-between mb-3"
                  onClick={() => setSandbox((prev) => !prev)}
                >
                  <div className="">
                    <IconBadgeAdOff />
                    <span className="text-sm">
                      Sandbox{" "}
                      <span className="text-muted-foreground">
                        - (Adblocker)
                      </span>
                    </span>

                    <Switch checked={sandbox} />
                  </div>
                </Button>
                {serversWithId.map((server, idx) => (
                  <Button
                    key={server.id}
                    variant={
                      server.id === selectedServer ? "destructive" : "outline"
                    }
                    size="xl"
                    className={`backdrop-blur-2xl ${
                      idx === 0 || idx === 6
                        ? "col-span-2"
                        : idx === 7
                        ? "col-span-3"
                        : ""
                    }`}
                    onClick={() => setSelectedServer(server.id)}
                  >
                    <IconCloudFilled
                      className={`${
                        server.id === selectedServer ? "animate-pulse" : ""
                      }`}
                    />
                    {server.id === 1
                      ? "Main Server"
                      : server.id === 2
                      ? "Backup"
                      : `Server ${server.id - 2}`}
                  </Button>
                ))}
                <div className="grid grid-cols-3 col-span-3 mt-3 gap-1">
                  {/* <Button size="xl" variant="outline">
                    <ArrowLeft /> Prev
                  </Button> */}
                  <Button
                    variant="outline"
                    size="xl"
                    className="col-span-3 flex items-center justify-between"
                    onClick={() => setReloadCounter((prev) => prev + 1)}
                  >
                    <span className="flex items-center gap-3">
                      <IconRefresh /> Refresh
                    </span>
                    <p>{activeServer?.name}</p>
                  </Button>
                  {/* <Button size="xl" variant="outline">
                    Next <ArrowRight />
                  </Button> */}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-2xl gap-4"
              >
                <img src={logo.src} className="size-14 animate-pulse" alt="" />
                <span className="flex items-center gap-2 text-muted-foreground tracking-wide text-sm ">
                  Initializing...
                  <Tailspin size="20" stroke="3" speed="0.9" color="white" />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <iframe
            key={`${activeServer?.embedLink}-${
              sandbox ? "sandbox" : ""
            }-${reloadCounter}`}
            height="100%"
            width="100%"
            src={activeServer?.embedLink}
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            {...(sandbox && {
              sandbox: "allow-scripts allow-same-origin allow-forms",
            })}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
