"use client";
import logo from "@/assets/zxczxc.svg";
import { Fade as Hamburger } from "hamburger-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import netflix from "@/assets/netflix.jpg";
import {
  IconBookmark,
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandTelegram,
  IconDownload,
  IconLogin,
  IconPackages,
  IconSettings2,
} from "@tabler/icons-react";
import { GalleryVerticalEnd } from "lucide-react";
import SearchModal from "@/components/search-components/search-modal";
import ChangeLogs from "./changelogs";
import Link from "next/link";
import InstallButton from "@/components/ui/install";

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`fixed w-full  z-20 transition-all duration-300 ${
        scrolled
          ? "bg-background backdrop-blur-lg pt-3 pb-3"
          : "bg-transparent lg:pt-8 pt-3 pb-3"
      }`}
    >
      <div className=" lg:w-[90%] w-[95%] flex justify-between items-center mx-auto">
        <div className="size-11 hidden lg:block">
          <img className="h-full w-full" src={logo.src} alt="" />
        </div>
        <div className="flex items-center lg:gap-2 gap-1">
          <SearchModal />
          <Popover open={isOpen} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div>
                <Hamburger
                  distance="md"
                  direction="left"
                  toggled={isOpen}
                  toggle={setOpen}
                  rounded
                  hideOutline={false}
                />
              </div>
            </PopoverTrigger>

            <PopoverContent
              className="mt-2 grid grid-cols-2 lg:gap-2 gap-0.5 p-0 border-0 bg-transparent"
              align="end"
            >
              <span className="p-4 bg-popover rounded-md border flex flex-col  gap-1">
                <IconBookmark />
                <p className="text-sm tracking-wide text-muted-foreground">
                  Watchlist
                </p>
              </span>
              <span className="p-4 bg-popover rounded-md border flex flex-col  gap-1">
                <GalleryVerticalEnd />
                <p className="text-sm tracking-wide text-muted-foreground">
                  History
                </p>
              </span>

              <span className="p-4 bg-popover rounded-md border flex flex-col  gap-1">
                <IconSettings2 />
                <p className="text-sm tracking-wide text-muted-foreground">
                  Settings
                </p>
              </span>

              <ChangeLogs />

              <div className="flex justify-between lg:py-4 px-6 py-2 items-center col-span-2 ">
                <Link
                  scroll={false}
                  href="https://www.facebook.com/profile.php?id=61567135169478"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#1877F2] text-white hover:bg-[#165ec9] transition-colors"
                >
                  <IconBrandFacebook size={24} />
                </Link>

                {/* Telegram */}
                <Link
                  scroll={false}
                  href={"https://t.me/zxc_stream"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#0088cc] text-white hover:bg-[#007ab8] transition-colors"
                >
                  <IconBrandTelegram size={24} />
                </Link>

                {/* Discord */}
                <Link
                  scroll={false}
                  href={"https://discord.gg/yv7wJV97Jd"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#5865F2] text-white hover:bg-[#4752c4] transition-colors"
                >
                  <IconBrandDiscord size={24} />
                </Link>
              </div>
            </PopoverContent>
          </Popover>
          <InstallButton />
          {/* <div className="size-8 hidden lg:block">
            <img
              className="object-contain h-full w-full rounded-sm"
              src={netflix.src}
              alt=""
            />
          </div> */}
        </div>
      </div>
    </header>
  );
}
