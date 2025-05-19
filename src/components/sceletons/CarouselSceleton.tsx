import { useWindowSize } from '@uidotdev/usehooks';
import { Skeleton } from 'components/components/ui/skeleton';
import { useEffect, useState } from 'react';

export const CarouselSceleton = () => {
  const [count, setCount] = useState(1);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width) {
      if (windowSize.width < 640) {
        setCount(1);
      } else if (windowSize.width < 1024) {
        setCount(2);
      } else if (windowSize.width < 1360) {
        setCount(3);
      } else setCount(4);
    }
  }, [windowSize]);

  return (
    <div className="flex gap-5 md:gap-20">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-header/20 shadow-lg rounded-4xl w-[305px] h-[400px] overflow-hidden animate-pulse"
        >
          <Skeleton className="w-full h-2/3" />
        </div>
      ))}
    </div>
  );
};
