"use client";
import { Input } from "@/components/ui/input";
import { Check, Search } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEscape } from "@/lib/useEscape";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import SpotlightBorderWrapper from "@/components/ui/border";
import { Button } from "@/components/ui/button";
import { IconCaretUpDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  useEscape(() => setOpen((prev) => !prev));
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [lastPage, setLastPage] = useState("/home");
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [text, setText] = useState(query ?? "");
  const [value, setValue] = useState("movie");
  const isHome = pathname === "/home";

  useEffect(() => {
    if (
      !pathname.startsWith("/home/search") &&
      !pathname.startsWith("/home/details") &&
      !pathname.startsWith("/home/discover") &&
      !pathname.startsWith("/home/watch")
    ) {
      setLastPage(pathname);
    }
  }, [pathname]);
  console.log("lastPage", lastPage);
  // useEffect(() => {
  //   const trimmed = text.trim();

  //   // ✅ If on home + no search → do nothing
  //   if (!trimmed && isHome) return;

  //   // ✅ Clear search → go back to last page
  //   if (!trimmed) {
  //     router.replace(lastPage, { scroll: false });
  //     return;
  //   }

  //   // ✅ Avoid replacing with same URL
  //   const nextUrl = `/home/search?type=${value}&query=${encodeURIComponent(
  //     trimmed
  //   )}`;
  //   const currentUrl = `${pathname}?${searchParams.toString()}`;

  //   if (nextUrl !== currentUrl) {
  //     router.replace(nextUrl, { scroll: false });
  //   }
  // }, [text, value]);

  // useEffect(() => {
  //   if (text.trim().length === 0) {
  //     router.replace(lastPage, { scroll: false });
  //     return;
  //   }

  //   router.replace(`/search?type=${value}&query=${encodeURIComponent(text)}`);
  // }, [text, value, lastPage]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value;
    setText(values);

    if (values.trim()) {
      router.push(
        `/home/search?type=${value}&query=${encodeURIComponent(values)}`,
        {
          scroll: false,
        }
      );
    } else {
      router.push(lastPage);
    }
  };
  return (
    <div className="relative flex items-center">
      <span className="absolute left-2 flex items-center border-r pl-1 pr-2">
        <Search className="size-4 opacity-50" />
      </span>
      <SpotlightBorderWrapper>
        <Input
          ref={inputRef}
          value={text}
          type="search"
          placeholder={
            value === "keyword"
              ? `Search topic.. e.g. "Time Loop" `
              : value === "movie"
              ? "Search Movie..."
              : "Search TV Shows..."
          }
          onChange={handleSearchChange}
          className="lg:w-sm w-full pr-28 pl-12 lg:text-base text-sm"
        />
      </SpotlightBorderWrapper>
      <div className="absolute top-0.5 right-0.5">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              role="combobox"
              aria-expanded={open}
              variant="outline"
              className="border-0 h-8"
            >
              {media_type.find((meow) => meow.value === value)?.label}
              <IconCaretUpDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-37.5 p-0">
            <Command>
              <CommandList>
                <CommandEmpty>No type found.</CommandEmpty>
                <CommandGroup>
                  {media_type.map((type) => (
                    <CommandItem
                      key={type.value}
                      value={type.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue);
                        setOpen(false);
                      }}
                    >
                      {type.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === type.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
const media_type = [
  {
    value: "movie",
    label: "Movie",
  },
  {
    value: "tv",
    label: "TV Show",
  },
  {
    value: "keyword",
    label: "Keyword",
  },
];
