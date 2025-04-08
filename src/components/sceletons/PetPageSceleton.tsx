import { Skeleton } from "components/components/ui/skeleton";


const PetPageSceleton = () => {
  return (
    <div className="flex gap-20 h-full container">
      <div className="w-1/2 h-2/3 flex flex-col gap-32  mt-100">
        <Skeleton className="w-full h-[630px] rounded-4xl shadow-lg" />
        <div className="flex gap-20">
          <Skeleton className="w-1/3 h-[200px] rounded-4xl shadow-lg" />
          <Skeleton className="w-1/3 h-[200px] rounded-4xl shadow-lg" />
          <Skeleton className="w-1/3 h-[200px] rounded-4xl shadow-lg" />
        </div>
      </div>

      <Skeleton className="w-1/2 h-[860px] rounded-4xl shadow-lg  mt-100"></Skeleton>
    </div>
  );
}

export default PetPageSceleton;
