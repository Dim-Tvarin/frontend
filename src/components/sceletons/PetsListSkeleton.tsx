import { Skeleton } from "components/components/ui/skeleton";

export function PetsListSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-20">
     {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="w-[305px] h-[400px] rounded-4xl overflow-hidden shadow-lg gap-20 bg-header/20 animate-pulse">
          <Skeleton className="w-full h-2/3" />
        </div>
      ))}
    </div>
  )
}