import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Check, CheckCheck, Clock, Sparkles } from "lucide-react";
import { IconDownload } from "@tabler/icons-react";
import { useIsMobile } from "@/hook/use-mobile";

export default function ChangeLogs() {
  const isMobile = useIsMobile();
  const versions = [
    {
      id: 4,
      version: "TBA",
      date: "Coming Soon",
      title: "Future Update",
      status: "upcoming",
      updates: [
        "Watch History",
        "Add to Watchlist",
        "Enhanced Search",
        "User Profiles",
      ],
    },
    // {
    //   id: 3,
    //   version: "1.1.0",
    //   date: "Nov 25, 2024",
    //   title: "Minor Update",
    //   status: "current",
    //   updates: [
    //     "Added new anime movies",
    //     "Improved loading performance",
    //     "UI refinements",
    //   ],
    // },
    // {
    //   id: 2,
    //   version: "1.0.1",
    //   date: "Oct 30, 2024",
    //   title: "Patch Update",
    //   status: "past",
    //   updates: ["Fixed broken streaming links", "Resolved buffering issues"],
    // },
    {
      id: 1,
      version: "v1.0.0",
      date: "Dec 21, 2025",
      title: "Initial Release",
      status: "current",
      updates: [
        "Launched movie website with basic features",
        "Keyword search functionality",
        "Added filter on Discover page",
        "Integrated video player with multiple servers",
      ],
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge
            variant="outline"
            className="bg-blue-700/10 text-blue-500 border-0 "
          >
            Upcoming
          </Badge>
        );
      case "current":
        return (
          <Badge
            variant="outline"
            className="bg-green-700/10 text-green-500  border-0 "
          >
            Current
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Drawer direction={isMobile ? "bottom" : "left"}>
      <DrawerTrigger asChild>
        <span className="p-4 bg-popover rounded-md border flex flex-col  gap-1 cursor-pointer">
          <IconDownload />
          <p className="text-sm tracking-wide text-muted-foreground">Updates</p>
        </span>
      </DrawerTrigger>
      <DrawerContent className="border-0!">
        <DrawerHeader className="p-4  bg-linear-to-br from-background to-muted/20 ">
          <div className="flex items-end justify-between">
            <div>
              <DrawerTitle className="text-xl font-bold">Changelog</DrawerTitle>
              <DrawerDescription className="text-sm mt-1">
                Track our latest updates and improvements
              </DrawerDescription>
            </div>
            <Badge variant="secondary" className="">
              v1.1.0
            </Badge>
          </div>
        </DrawerHeader>

        <div className="flex-1 space-y-6 p-4 overflow-auto custom-scrollbar">
          {versions.map((version, index) => (
            <div key={version.id} className="relative  last:pb-0">
              {/* Timeline line */}
              {/* {index !== versions.length - 1 && (
                <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-linear-to-b from-border to-transparent" />
              )} */}

              {/* Timeline dot */}
              {/* <div
                className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center ${
                  version.status === "upcoming"
                    ? "bg-blue-500/10 border-blue-500"
                    : version.status === "current"
                    ? "bg-green-500/10 border-green-500"
                    : "bg-muted border-border"
                }`}
              >
                {version.status === "past" && (
                  <Check className="size-5 text-muted-foreground" />
                )}
                {version.status === "current" && (
                  <Sparkles className="size-5 text-green-500" />
                )}
                {version.status === "upcoming" && (
                  <Clock className="size-5 text-blue-500" />
                )}
              </div> */}

              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className=" font-semibold">{version.title}</h3>
                      {getStatusBadge(version.status)}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-mono font-medium">
                        {version.version}
                      </span>
                      <span>•</span>
                      <span>{version.date}</span>
                    </div>
                  </div>
                </div>

                <ul className="flex gap-1.5 flex-wrap">
                  {version.updates.map((update, idx) => (
                    <Button
                      className="flex-1 justify-start bg-accent/30"
                      variant="secondary"
                      key={idx}
                    >
                      {update}
                    </Button>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4  bg-muted/20 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Last updated: Dec 21, 2025
          </p>
          {/* <Button variant="ghost" size="sm" asChild>
            <a href="#" className="gap-2">
              View Full History
            </a>
          </Button> */}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

//  <DrawerFooter className="flex-col! gap-4">
//    <Button className="w-full" variant="destructive">
//      <IconBrandFacebook /> Have suggestions or want to report a problem?
//    </Button>
//    <div className="flex gap-3 items-center text-sm text-muted-foreground">
//      <Separator className="flex-1 bg-border" />
//      Visit us for more update
//      <Separator className="flex-1 bg-border" />
//    </div>
//    <div className="flex justify-center items-center gap-6">
//      <Link
//        scroll={false}
//        href="https://www.facebook.com"
//        target="_blank"
//        rel="noopener noreferrer"
//        className="p-2 rounded-full bg-[#1877F2] text-white hover:bg-[#165ec9] transition-colors"
//      >
//        <IconBrandFacebook size={24} />
//      </Link>

//      {/* Telegram */}
//      <Link
//        scroll={false}
//        href="https://t.me/yourchannel"
//        target="_blank"
//        rel="noopener noreferrer"
//        className="p-2 rounded-full bg-[#0088cc] text-white hover:bg-[#007ab8] transition-colors"
//      >
//        <IconBrandTelegram size={24} />
//      </Link>

//      {/* Discord */}
//      <Link
//        scroll={false}
//        href="https://discord.com"
//        target="_blank"
//        rel="noopener noreferrer"
//        className="p-2 rounded-full bg-[#5865F2] text-white hover:bg-[#4752c4] transition-colors"
//      >
//        <IconBrandDiscord size={24} />
//      </Link>
//    </div>
//  </DrawerFooter>;
