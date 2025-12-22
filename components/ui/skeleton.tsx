// import { cn } from "@/lib/utils"

// function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="skeleton"
//       className={cn("bg-accent animate-pulse rounded-md", className)}
//       {...props}
//     />
//   )
// }

// export { Skeleton }
import { cn } from "@/lib/utils";

type SkeletonProps = React.ComponentProps<"div"> & {
  pulse?: boolean;
};

function Skeleton({ className, pulse = true, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-accent rounded-md",
        pulse && "animate-pulse",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
