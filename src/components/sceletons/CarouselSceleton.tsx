import { Skeleton } from "components/components/ui/skeleton";

export const CarouselSceleton = () => {
  return (
    <div className="flex gap-20">
     {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="w-[305px] h-[400px] rounded-4xl overflow-hidden shadow-lg">
          <Skeleton className="w-full h-2/3" />
        </div>
      ))}
    </div>
  );
}
