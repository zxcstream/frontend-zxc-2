"use client";
import { Separator } from "@/components/ui/separator";
import { IconBookmark } from "@tabler/icons-react";
import { Film, LucideIcon, Sword, Swords, Telescope, Tv } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  label: string;
  icon: LucideIcon;
  link: string;
}
export default function ContentState() {
  const navigation = [
    {
      label: "Movie",
      link: "/home",
      icon: Film,
    },
    {
      label: "TV Show",
      link: "/home/tv",
      icon: Tv,
    },
    {
      label: "Anime",
      link: "/home/anime",
      icon: Swords,
    },
    {
      label: "Discover",
      link: "/home/discover",
      icon: Telescope,
    },
    {
      label: "Watchlist",
      link: "/home/watchlist",
      icon: IconBookmark,
    },
  ];
  return (
    <div className="w-full sticky top-15 z-20 bg-background  ">
      <div className="flex items-center lg:gap-12 gap-8 lg:w-[90%] w-[95%] mx-auto relative  z-20   py-5 px-1 border-b  overflow-x-auto ">
        <div className="flex items-center lg:gap-12 gap-8 tracking-wide">
          {navigation.map((n) => (
            <NavItem key={n.link} label={n.label} icon={n.icon} link={n.link} />
          ))}
        </div>
        {/* <Separator className="flex-1 bg-linear-to-r from-border via-transparent to-transparent" /> */}
      </div>
      {/* <div className="flex  items-center w-full lg:py-6 py-4 lg:gap-12 gap-6  tracking-wide overflow-x-auto lg:border-b-0 border-b p-1"></div> */}
    </div>
  );
}
const NavItem = ({ label, icon: Icon, link }: NavItemProps) => {
  const path = usePathname();
  console.log(path);
  return (
    <Link href={link}>
      <span
        className={`cursor-pointer flex items-center gap-2
      active:scale-97 hover:scale-102 transition duration-50 lg:text-lg text-sm whitespace-nowrap ${
        path === link ? "font-medium" : "text-muted-foreground"
      }`}
      >
        <Icon className="size-5" />
        {label}
      </span>
    </Link>
  );
};
// "use client";

// import { Separator } from "@/components/ui/separator";
// import { Film, LucideIcon, Swords, Telescope, Tv } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import { cn } from "@/lib/utils";

// interface NavItem {
//   label: string;
//   icon: LucideIcon;
//   link: string;
// }

// export default function ContentState() {
//   const pathname = usePathname();

//   const navigation: NavItem[] = [
//     { label: "Discover", link: "/", icon: Telescope },
//     { label: "Movie", link: "/movie", icon: Film },
//     { label: "TV Show", link: "/tv", icon: Tv },
//     { label: "Anime", link: "/anime", icon: Swords },
//   ];

//   const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
//   const [hoverStyle, setHoverStyle] = useState({});
//   const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" });

//   const activeIndex = navigation.findIndex((n) => n.link === pathname);

//   // Hover indicator
//   useEffect(() => {
//     if (hoveredIndex !== null) {
//       const el = itemRefs.current[hoveredIndex];
//       if (el) {
//         setHoverStyle({
//           left: `${el.offsetLeft}px`,
//           width: `${el.offsetWidth}px`,
//         });
//       }
//     }
//   }, [hoveredIndex]);

//   // Active underline
//   useEffect(() => {
//     const el = itemRefs.current[activeIndex];
//     if (el) {
//       requestAnimationFrame(() => {
//         setActiveStyle({
//           left: `${el.offsetLeft}px`,
//           width: `${el.offsetWidth}px`,
//         });
//       });
//     }
//   }, [activeIndex]);

//   return (
//     <div className="lg:w-[90%] w-[95%] mx-auto sticky top-15 z-20 bg-background py-1">
//       <div className="relative flex items-center lg:py-1 py-4 gap-6 overflow-auto">
//         {/* Hover background */}
//         <div
//           className="absolute h-9 rounded-md bg-muted/40 transition-all duration-300"
//           style={{
//             ...hoverStyle,
//             opacity: hoveredIndex !== null ? 1 : 0,
//           }}
//         />

//         {/* Active underline */}
//         <div
//           className="absolute bottom-1 h-0.5 bg-foreground transition-all duration-300"
//           style={activeStyle}
//         />

//         {navigation.map((n, index) => {
//           const Icon = n.icon;
//           const isActive = pathname === n.link;

//           return (
//             <Link
//               key={n.link}
//               href={n.link}
//               ref={(el) => {
//                 itemRefs.current[index] = el;
//               }}
//               onMouseEnter={() => setHoveredIndex(index)}
//               onMouseLeave={() => setHoveredIndex(null)}
//               className={cn(
//                 "relative z-10 flex items-center gap-2 px-3 py-2 whitespace-nowrap  font-medium",
//                 "transition-transform ",
//                 isActive
//                   ? "text-foreground font-medium"
//                   : "text-muted-foreground"
//               )}
//             >
//               <Icon className="size-5" />
//               <span className="lg:text-lg text-sm">{n.label}</span>
//             </Link>
//           );
//         })}

//         <Separator className="flex-1 bg-linear-to-r from-border to-transparent" />
//       </div>
//     </div>
//   );
// }
