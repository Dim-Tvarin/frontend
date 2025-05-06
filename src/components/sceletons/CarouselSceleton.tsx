import { Skeleton } from 'components/components/ui/skeleton';
import { useEffect, useState } from 'react';

export const CarouselSceleton = () => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;
      if (width < 640) setCount(1);
      else if (width < 1024) setCount(2);
      else if (width < 1360) setCount(3);
      else setCount(4);
    };

    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  return (
    <div className="flex gap-5 md:gap-20">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-[305px] h-[400px] rounded-4xl overflow-hidden shadow-lg bg-header/20 animate-pulse"
        >
          <Skeleton className="w-full h-2/3 " />
        </div>
      ))}
    </div>
  );
};
