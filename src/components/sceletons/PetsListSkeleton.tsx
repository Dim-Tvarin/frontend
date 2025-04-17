import { Skeleton } from 'components/components/ui/skeleton';
import { cn } from 'components/lib/utils';

interface PetsListSkeletonProps {
  className?: string;
  length?: number;
}

export function PetsListSkeleton({
  className,
  length = 8,
}: PetsListSkeletonProps) {
  return (
    <div className={cn('grid grid-cols-4 gap-20', className)}>
      {Array.from({ length }).map((_, i) => (
        <div
          key={i}
          className="w-[305px] h-[400px] rounded-4xl overflow-hidden shadow-lg gap-20 bg-header/20 animate-pulse"
        >
          <Skeleton className="w-full h-2/3" />
        </div>
      ))}
    </div>
  );
}
