import { CustomButton } from 'components/CustomButton';
import { LuCirclePlus } from 'react-icons/lu';
import { FiFilter } from 'react-icons/fi';
import { PetsListSkeleton } from 'components/sceletons/PetsListSkeleton';
import AnimalCard from 'components/AnimalCard';
import Pagination from 'components/Pagination';
import { useNavigate } from 'react-router';
import type { AnimalsResponse } from 'src/redux/animals/animalsApi';

interface ProfileMyAdvertsTabProps {
  setOpenFilters: React.Dispatch<React.SetStateAction<boolean>>;
  data?: AnimalsResponse;
  isLoading: boolean;
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
}
const ProfileMyAdvertsTab = ({
  setOpenFilters,
  data,
  isLoading,
  totalPages,
  page,
  setPage,
}: ProfileMyAdvertsTabProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-row align-center justify-between">
        <CustomButton
          type="submit"
          styleType="defaultButton"
          className="flex gap-8 w-[238px] text-base m-0"
          onClick={() => {
            navigate('/announcement');
          }}
        >
          <LuCirclePlus size={24} />
          Додати оголошення
        </CustomButton>
        <CustomButton
          type="button"
          styleType="defaultButton"
          className="flex gap-[6px] w-[108px] h-[45px] m-0 text-base"
          onClick={() => setOpenFilters(prev => !prev)}
        >
          <FiFilter className="w-25 h-[29px]" />
          Фільтр
        </CustomButton>
      </div>
      {data?.animals.length === 0 ? (
        <p className="text-center text-lg text-gray-500 mt-10">
          У вас поки немає оголошень.
        </p>
      ) : (
        <>
          {isLoading && !data?.animals && (
            <PetsListSkeleton className="grid-cols-3" length={9} />
          )}
          <div className="grid grid-cols-3 gap-20 wrap">
            {data?.animals.map(item => (
              <AnimalCard
                key={item.id}
                id={item.id}
                name={item.animalName}
                gender={item.gender}
                age={item.age}
                photoSrc={item.animalImages[0].url}
                isMyProfile={true}
                status={item.status}
                animal={item}
              />
            ))}
          </div>
        </>
      )}
      {!isLoading && data && !!totalPages && totalPages > 1 && (
        <Pagination
          onPageChange={setPage}
          currentPage={page}
          totalPages={totalPages}
          className="mb-50 mt-auto"
        />
      )}
    </>
  );
};

export default ProfileMyAdvertsTab;
