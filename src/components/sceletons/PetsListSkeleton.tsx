import { Skeleton } from 'components/components/ui/skeleton';
import { cn } from 'components/lib/utils';
import { useEffect, useState } from 'react';

interface PetsListSkeletonProps {
  className?: string;
  length?: number;
}

export function PetsListSkeleton({ className }: PetsListSkeletonProps) {
  const [length, setLength] = useState(2);

  useEffect(() => {
    const updateLength = () => {
      const width = window.innerWidth;
      if (width >= 1440) {
        setLength(8);
      } else if (width >= 768) {
        setLength(4);
      } else {
        setLength(2);
      }
    };
    updateLength();

    window.addEventListener('resize', updateLength);
    return () => window.removeEventListener('resize', updateLength);
  }, []);

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 place-items-center mb-30',
        className
      )}
    >
      {Array.from({ length }).map((_, i) => (
        <div
          key={i}
          className="gap-20 bg-header/20 shadow-lg rounded-4xl w-[305px] h-[400px] overflow-hidden 2xl:scale-100 xl:scale-80 animate-pulse"
        >
          <Skeleton className="w-full h-2/3" />
        </div>
      ))}
    </div>
  );
}
