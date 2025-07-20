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
import { cn } from './lib/utils';
import pawsBg from '../assets/bg-paws-profile-ads.png';
import pawsFilterBg from '../assets/bg-paws-profile-filter.png';

const limit = 12;

const ProfileMyAdvertsTab = () => {
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const tabletSize = windowSize.width !== null && windowSize.width < 1024;
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
            <p className="w-50% text-default-btn text-base md:text-lg text-center">
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
        <p className="text-center text-lg text-input-label mt-10">
          У вас поки немає оголошень.
        </p>
      ) : (
        <div>
          {isLoading ? (
            <PetsListSkeleton className="grid-cols-3" length={9} />
          ) : (
            <div className="relative flex justify-around 2xl:justify-start gap-20">
              {openFilters ? (
                <>
                  {openFilters && windowSize.width! < 1024 && (
                    <div
                      className="fixed inset-0 bg-black/80 z-40"
                      onClick={() => setOpenFilters(false)}
                    />
                  )}
                  <div className="z-50 fixed top-0 left-0 lg:absolute 2xl:-left-[324px] flex flex-col bg-dialog lg:bg-transparent 2xl:pt-100 rounded-r-4xl md:rounded-r-4xl lg:rounded-4xl">
                    <div className="flex justify-between items-center mb-4 px-16">
                      <div className="pt-[40px] lg:hidden block font-medium text-default-btn text-base">
                        Фільтр
                      </div>
                      <div
                        className="pt-[32px] lg:hidden"
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
                    {!tabletSize && (
                      <div
                        style={{
                          backgroundImage: `url(${pawsFilterBg})`,
                          backgroundRepeat: 'no-repeat',
                          width: '281px',
                          height: '1059px',
                          marginTop: '-100px',
                        }}
                      ></div>
                    )}
                  </div>
                </>
              ) : (
                !tabletSize && (
                  <div
                    className="absolute top-[52px] 2xl:-left-[324px] "
                    style={{
                      backgroundImage: `url(${pawsBg})`,
                      backgroundRepeat: 'no-repeat',
                      width: '283px',
                      height: '1227px',
                    }}
                  ></div>
                )
              )}
              <div className="flex gap-[32px] lg:gap-[50px] flex-col grow">
                <div
                  className={cn(
                    'm-auto 2xl:m-0',
                    'grid gap-16 lg:gap-20 wrap justify-center transition-all duration-500',
                    'grid-cols-2 sm:grid-cols-3 md:grid-cols-2',
                    openFilters
                      ? 'lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3'
                      : 'lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-3',
                    openFilters && 'lg:w-3/4 xl:w-3/4 2xl:w-full'
                  )}
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
                    className="mb-50 lg:mb-100 mt-auto"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileMyAdvertsTab;
