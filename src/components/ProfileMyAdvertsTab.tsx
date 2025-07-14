import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { showToast } from 'components/Toast';
import Pagination from 'components/Pagination';
import AnimalCard from 'components/AnimalCard';
import { PetsListSkeleton } from 'components/sceletons/PetsListSkeleton';
import { CustomButton } from 'components/CustomButton';
import { LuCirclePlus } from 'react-icons/lu';
import { FiFilter } from 'react-icons/fi';
import { useGetMyAnimalsQuery } from 'src/redux/animals/animalsApi';
import { useWindowSize } from '@uidotdev/usehooks';
import Filter, { type FilterFormValues } from './Filter';
import CloseSVG from 'src/assets/CloseSVG';
import { useFilters } from 'src/context/FiltersContext';

const limit = 12;

const ProfileMyAdvertsTab = () => {
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = Number(searchParams.get('page'));
  const [page, setPage] = useState(rawPage === 0 ? 1 : rawPage);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const { filtersParams, setFiltersParams } = useFilters();
  const [openFilters, setOpenFilters] = useState(false);

  const { data, isLoading, error, refetch } = useGetMyAnimalsQuery({
    page,
    limit,
    ...filtersParams,
  });

  const totalPages = data && Math.ceil(data?.total / limit);

  useEffect(() => {
    if (error) {
      showToast({
        title: 'Щось пішло не по плану',
        description: 'Виникла помилка при завантаженні даних',
        status: 'error',
      });
    }
  }, [error]);

  useEffect(() => {
    if (Object.keys(filtersParams).length > 0 && !isLoading)
      setIsFilterApplied(true);
  }, [filtersParams, isLoading]);

  const onSubmit = (formData: FilterFormValues) => {
    const cleanedData = Object.fromEntries(
      Object.entries({ ...formData }).filter(([, v]) => v)
    );
    setFiltersParams(cleanedData);

    const newParams = new URLSearchParams();
    Object.entries(cleanedData).forEach(([key, value]) => {
      newParams.set(key, value as string);
    });
    newParams.set('page', '1');
    setSearchParams(newParams);
    if (windowSize.width && windowSize.width < 1280) setOpenFilters(false);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-20 lg:gap-0 items-center justify-between">
        <CustomButton
          type="submit"
          styleType="defaultButton"
          className="flex gap-8 w-[242px] lg:w-[238px] text-base m-0"
          onClick={() => {
            navigate('/announcement');
          }}
        >
          <LuCirclePlus size={24} />
          Додати оголошення
        </CustomButton>
        {windowSize.width !== null &&
          windowSize.width >= 768 &&
          isFilterApplied &&
          data && (
            <p className="w-full text-default-btn text-base md:text-lg text-center">
              {data.total === 0
                ? 'По вашому запиту знайдено 0'
                : `По вашому запиту знайдено ${data.total} тварини`}
            </p>
          )}
        <CustomButton
          type="button"
          styleType="defaultButton"
          className="flex gap-[6px] w-[242px] lg:w-[108px] m-0 text-base"
          onClick={() => setOpenFilters(prev => !prev)}
        >
          <FiFilter className="w-25 h-[29px]" />
          Фільтр
        </CustomButton>
        {isFilterApplied && data && (
          <p className="w-full text-default-btn text-base md:hidden text-center">
            {data.total === 0
              ? 'По вашому запиту знайдено 0'
              : `По вашому запиту знайдено ${data.total} тварини`}
          </p>
        )}
      </div>

      {!isFilterApplied && data?.animals.length === 0 ? (
        <p className="text-center text-lg text-gray-500 mt-10">
          У вас поки немає оголошень.
        </p>
      ) : (
        <div>
          {isLoading ? (
            <PetsListSkeleton className="grid-cols-3" length={9} />
          ) : (
            <div className="relative flex justify-around gap-20">
              {openFilters && (
                <>
                  {openFilters && windowSize.width! < 768 && (
                    <div
                      className="fixed inset-0 bg-black/80 z-40"
                      onClick={() => setOpenFilters(false)}
                    />
                  )}
                  <div className="z-100 fixed top-0 left-0  md:absolute 2xl:-left-[324px] flex flex-col bg-dialog md:bg-transparent 2xl:pt-100 rounded-r-4xl md:rounded-4xl">
                    <div className="flex justify-between items-center mb-4 px-16">
                      <div className="pt-[40px] md:hidden block font-medium text-default-btn text-base">
                        Фільтр
                      </div>
                      <div
                        className="pt-[32px] md:hidden"
                        onClick={() => setOpenFilters(false)}
                      >
                        <CloseSVG fill="white" size="27" />
                      </div>
                    </div>

                    <Filter
                      onSubmit={onSubmit}
                      isLoading={isLoading}
                      onClose={() => setOpenFilters(false)}
                    />
                  </div>
                </>
              )}
              <div
                className={`md:ml-auto grid gap-16 lg:gap-20 mb-32 md:mb-50 wrap justify-center transition-all duration-500 grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 ${openFilters ? 'xl:grid-cols-3 xl:w-3/4' : 'xl:grid-cols-4'}`}
              >
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
                    onRefetchMyAnimals={refetch}
                  />
                ))}
              </div>

              {!isLoading && data && !!totalPages && totalPages > 1 && (
                <Pagination
                  onPageChange={setPage}
                  currentPage={page}
                  totalPages={totalPages}
                  className="mb-50 mt-auto"
                />
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileMyAdvertsTab;
