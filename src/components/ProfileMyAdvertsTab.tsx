import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { showToast } from 'components/Toast';
import AdvertsFilter from 'components/AdvertsFilter';
import Pagination from 'components/Pagination';
import AnimalCard from 'components/AnimalCard';
import { PetsListSkeleton } from 'components/sceletons/PetsListSkeleton';
import { CustomButton } from 'components/CustomButton';
import { LuCirclePlus } from 'react-icons/lu';
import { FiFilter } from 'react-icons/fi';
import {
  useGetMyAnimalsQuery,
  type AnimalsResponse,
} from 'src/redux/animals/animalsApi';

export interface AnimalsFilters {
  animalType?: 'cats' | 'dogs' | 'birds' | 'other';
  gender?: 'male' | 'female';
  breed?: string;
  location?: string;
  age?: string;
  size?: string;
  status?: 'active' | 'inactive';
  sortByDate?: 'newest' | 'oldest';
}

const ProfileMyAdvertsTab = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const rawPage = Number(searchParams.get('page'));
  const [page, setPage] = useState(rawPage === 0 ? 1 : rawPage);
  const [filters, setFilters] = useState<AnimalsFilters>({});
  const [openFilters, setOpenFilters] = useState(false);

  const { data, isLoading, error, refetch } = useGetMyAnimalsQuery({
    page,
    limit: 9,
    ...filters,
  }) as {
    data: AnimalsResponse;
    isLoading: boolean;
    error: any;
    refetch(): void;
  };
  const totalPages = data ? Math.ceil(data.total / 9) : 1;

  useEffect(() => {
    if (error) {
      showToast({
        title: 'Щось пішло не по плану',
        description: 'Виникла помилка при завантаженні даних',
        status: 'error',
      });
    }
  }, [error]);

  const handleFilterChange = <K extends keyof AnimalsFilters>(
    key: K,
    value: AnimalsFilters[K]
  ) => setFilters(prev => ({ ...prev, [key]: value }));

  const handleFilterReset = () => setFilters({});
  const handleFilterSubmit = () => {
    setPage(1);
    refetch();
  };

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

      {openFilters && (
        <AdvertsFilter
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleFilterReset}
          onSubmit={handleFilterSubmit}
        />
      )}

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
