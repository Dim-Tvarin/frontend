import { FiFilter } from 'react-icons/fi';
import { CustomButton } from 'components/CustomButton';
import { useGetFilteredAnimalsQuery } from 'src/redux/animals/animalsApi';
import AnimalCard from 'components/AnimalCard';
import { PetsListSkeleton } from 'components/sceletons/PetsListSkeleton';
import Pagination from 'components/Pagination';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { showToast } from 'components/Toast';
import { cn } from 'components/lib/utils';
import { useWindowSize } from '@uidotdev/usehooks';
import { mapAnimalType } from './mapping';
import { Spinner } from 'components/Spinner';
import CloseSVG from 'src/assets/CloseSVG';
import Filter, { type FilterFormValues } from 'components/Filter';
import { useFilters } from 'src/context/FiltersContext';

const limit = 12;

const PetsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = Number(searchParams.get('page'));
  const [page, setPage] = useState(rawPage === 0 ? 1 : rawPage);
  const [openFilters, setOpenFilters] = useState(false);
  const [openSorting, setOpenSorting] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const { filtersParams, setFiltersParams } = useFilters();

  const navigate = useNavigate();
  const windowSize = useWindowSize();

  const { data, isLoading, isFetching, error } = useGetFilteredAnimalsQuery(
    { page, limit, ...filtersParams },
    { skip: !filtersParams }
  );

  const totalPages = data && Math.ceil(data?.total / limit);
  const title =
    filtersParams && filtersParams?.animalType
      ? mapAnimalType[filtersParams?.animalType]
      : 'Всі тварини';

  useEffect(() => {
    if (error) {
      showToast({
        title: 'Щось пішло не по плану',
        description: 'Спробуйте ще раз пізніше',
        status: 'error',
      });
      navigate('/');
    }
  }, [error]);

  useEffect(() => {
    const rawPage = Number(searchParams.get('page'));
    setPage(rawPage === 0 ? 1 : rawPage);
  }, [searchParams]);

  useEffect(() => {
    if (Object.keys(filtersParams).length > 0 && !isLoading && !isFetching)
      setIsFilterApplied(true);
  }, [isFetching, filtersParams, isLoading]);

  useEffect(() => {
    setSearchParams(filtersParams);
  }, [filtersParams]);

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

  const handleAscSorting = () => {
    setFiltersParams({ ...filtersParams, sortByDate: 'newest' });
    setOpenSorting(false);
  };
  const handleDescSorting = () => {
    setFiltersParams({ ...filtersParams, sortByDate: 'oldest' });
    setOpenSorting(false);
  };
  return (
    <div className="container">
      <div className="relative flex justify-center mt-30 lg:mt-100 mb-[120px] lg:mb-50">
        <div className="flex flex-col">
          <h1 className="mb-10 text-default-btn md:text-[32px] dark:text-default-btn text-lg">
            {title}
          </h1>
          {isFilterApplied && data && (
            <p className="w-full text-default-btn text-base md:text-lg text-center">
              {data.total === 0
                ? 'По вашому запиту знайдено 0, але ви можете обрати іншу тварину'
                : `По вашому запиту знайдено ${data.total} тварини`}
            </p>
          )}
        </div>
        {data && data?.total > 0 && (
          <div
            className={`lg:top-0 absolute flex justify-between m-0 w-full ${isFilterApplied ? 'top-80' : 'top-72'}`}
          >
            <CustomButton
              type="button"
              styleType="defaultButton"
              className="m-0 mt-0 w-[121px] md:w-[129px]"
              onClick={() => setOpenFilters(prev => !prev)}
            >
              <FiFilter size={18} />
              <span className="text-base">Фільтр</span>
            </CustomButton>
            <div className="z-10 flex flex-col items-end">
              <CustomButton
                type="button"
                styleType="whiteButton"
                className="w-[192px] md:w-[217px] text-medium text-base text-default-btn"
                onClick={() => setOpenSorting(prev => !prev)}
              >
                Сортування за датою
              </CustomButton>
              {openSorting && (
                <div className="flex flex-col gap-4 bg-dialog px-16 py-10 border-1 border-default-btn rounded-xl">
                  <button
                    onClick={handleAscSorting}
                    className={cn(
                      'text-default-btn text-left text-lg focus:outline-none hover:text-orange transition-all duration-300',
                      filtersParams?.sortByDate === 'newest' && 'text-orange'
                    )}
                  >
                    Останні оголошення
                  </button>
                  <button
                    onClick={handleDescSorting}
                    className={cn(
                      'text-default-btn text-left text-lg focus:outline-none hover:text-orange transition-all duration-300',
                      filtersParams?.sortByDate === 'oldest' && 'text-orange'
                    )}
                  >
                    Давні оголошення
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <PetsListSkeleton />
      ) : (
        <div className="relative flex justify-around gap-20">
          {openFilters && (
            <div
              className="z-50 fixed xl:relative inset-0 flex flex-col items-start gap-24 bg-black/50 xl:bg-transparent pt-100 xl:pt-0 pl-16 xl:pl-0 xl:w-1/4 xl:h-fit"
              onClick={() => {
                setOpenFilters(false);
              }}
            >
              <div className="relative flex flex-col bg-dialog xl:bg-transparent xl:p-0 pt-32 rounded-4xl">
                <div className="flex justify-between items-center mb-4 px-16">
                  <div className="xl:hidden block font-medium text-default-btn text-base">
                    Фільтр
                  </div>
                  <div
                    className="xl:hidden"
                    onClick={() => setOpenFilters(false)}
                  >
                    <CloseSVG fill="white" size="27" />
                  </div>
                </div>

                <Filter
                  onSubmit={onSubmit}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  onClose={() => setOpenFilters(false)}
                />
              </div>
            </div>
          )}
          {isLoading || isFetching ? (
            <div className="flex justify-center w-full h-[50vh]">
              <Spinner size="100" />
            </div>
          ) : (
            <div
              className={`grid gap-16 lg:gap-20 mb-32 md:mb-50 wrap justify-center transition-all duration-500 grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 ${openFilters ? 'w-full xl:grid-cols-3 xl:w-3/4' : 'xl:grid-cols-4'}`}
            >
              {data?.animals.map(item => (
                <AnimalCard
                  key={item.id}
                  id={item.id}
                  name={item.animalName}
                  gender={item.gender}
                  age={item.age}
                  photoSrc={item.animalImages[0].url}
                  status={item.status}
                  animal={item}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {!isLoading && data && !!totalPages && totalPages > 1 && (
        <Pagination
          onPageChange={setPage}
          currentPage={page}
          totalPages={totalPages}
          className="mb-50 lg:mb-100"
        />
      )}
    </div>
  );
};

export default PetsList;
