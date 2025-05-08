import { Skeleton } from 'components/components/ui/skeleton';

const PetPageSceleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-20 h-full container">
      <div className="hidden lg:flex w-1/2 h-2/3 flex-col gap-32  mt-100 ">
        <Skeleton className="w-full h-[630px] rounded-4xl shadow-lg bg-header/20 animate-pulse" />
        <div className="flex gap-20 ">
          <Skeleton className="w-1/3 h-[200px] rounded-4xl shadow-lg bg-header/20 animate-pulse" />
          <Skeleton className="w-1/3 h-[200px] rounded-4xl shadow-lg bg-header/20 animate-pulse" />
          <Skeleton className="w-1/3 h-[200px] rounded-4xl shadow-lg bg-header/20 animate-pulse" />
        </div>
      </div>

      <Skeleton className="w-full lg:w-1/2 h-[200px] lg:h-[860px] rounded-4xl shadow-lg  mt-100 bg-header/20 animate-pulse"></Skeleton>

      <div className="flex lg:hidden flex-col gap-32 mt-10 ">
        <Skeleton className="w-full h-[20px] rounded-xl shadow-lg bg-header/20 animate-pulse" />
        <Skeleton className="w-full h-[20px] rounded-xl shadow-lg bg-header/20 animate-pulse" />
        <Skeleton className="w-full h-[20px] rounded-xl shadow-lg bg-header/20 animate-pulse" />
      </div>
    </div>
  );
};

export default PetPageSceleton;
