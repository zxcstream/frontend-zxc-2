import { Skeleton } from "./skeleton";

export default function SkeletonCard2({ pulse = true }: { pulse?: boolean }) {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton pulse={pulse} className="flex-10" /> {/* biggest */}
      <div className="flex-1 flex flex-col gap-1">
        <Skeleton pulse={pulse} className="flex-1 w-1/2" /> {/* smaller */}
        <Skeleton pulse={pulse} className="flex-[0.8] w-1/3" /> {/* smaller */}
      </div>
    </div>
  );
}
