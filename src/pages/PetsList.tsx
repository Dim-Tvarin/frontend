import { FiFilter } from 'react-icons/fi';
import { CustomButton } from 'components/CustomButton';
import {
  useGetFilteredAnimalsQuery,
  type SortOrder,
} from 'src/redux/animals/animalsApi';
import AnimalCard from 'components/AnimalCard';
import { PetsListSkeleton } from 'components/sceletons/PetsListSkeleton';
import Pagination from 'components/Pagination';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { showToast } from 'components/Toast';
import FilterItem from 'components/FilterItem';
import {
  ageOption,
  animalTypeOptions,
  AnimalType,
  genderOption,
  size,
} from './Announcement/types';
import BreedSelect from 'components/BreedSelect';
import { CitySelect } from 'components/CitySelect';
import { Controller, useForm } from 'react-hook-form';
import { cn } from 'components/lib/utils';
import { useWindowSize } from '@uidotdev/usehooks';

const limit = 12;

interface FilterFormValues {
  animalType: AnimalType | undefined;
  gender: string;
  breed: string;
  location: string;
  age: string;
  size: string;
  sortByDate?: 'newest' | 'oldest';
}

const mapAnimalType = {
  cats: 'Котики',
  dogs: 'Собаки',
  birds: 'Пташки',
  other: 'Інші тварини',
};

const PetsList = () => {
  const [searchParams] = useSearchParams();
  const rawPage = Number(searchParams.get('page'));
  const [page, setPage] = useState(rawPage === 0 ? 1 : rawPage);
  const [openFilters, setOpenFilters] = useState(false);
  const [openSorting, setOpenSorting] = useState(false);
  const [filtersParams, setFiltersParams] = useState<Partial<FilterFormValues>>(
    {}
  );
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [sorting, setSorting] = useState<SortOrder>('newest');

  const navigate = useNavigate();
  const windowSize = useWindowSize();

  const { data, isLoading, isFetching, error } = useGetFilteredAnimalsQuery(
    { page, limit, ...filtersParams },
    { skip: !filtersParams }
  );
  const { control, handleSubmit, watch, reset } = useForm<FilterFormValues>({
    defaultValues: {
      animalType: undefined,
      gender: '',
      breed: '',
      location: '',
      age: '',
      size: '',
    },
  });
  const selectedAnimalType = watch('animalType');
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

  const onSubmit = (formData: FilterFormValues) => {
    const filters = { ...formData, sortByDate: sorting };
    setFiltersParams(filters);
    if (windowSize.width && windowSize.width < 1280) setOpenFilters(false);
  };

  const handleAscSorting = () => {
    setSorting('newest');
    setFiltersParams({ sortByDate: 'newest' });
    setOpenSorting(false);
  };
  const handleDescSorting = () => {
    setSorting('oldest');
    setFiltersParams({ sortByDate: 'oldest' });
    setOpenSorting(false);
  };
  const handleClearFilter = () => {
    setFiltersParams({});
    reset();
  };

  return (
    <div className="container">
      <div className="relative flex justify-center mt-72 lg:mt-100 mb-100 lg:mb-50">
        <div className="flex flex-col">
          <h1 className="mb-10 md:text-[32px] text-lg">{title}</h1>
          {isFilterApplied && data && (
            <p className="w-full text-default-btn text-base md:text-lg text-center">
              {data.total === 0
                ? 'По вашому запиту нічого не знайдено'
                : `По вашому запиту знайдено ${data.total} тварини`}
            </p>
          )}
        </div>
        {data?.total === 0 ? (
          <CustomButton
            type="button"
            styleType="defaultButton"
            className="top-[95px] md:top-[135px] left-[calc(50%-98px)] z-50 absolute m-0 w-[196px]"
            onClick={handleClearFilter}
          >
            До списку тварин
          </CustomButton>
        ) : (
          <div
            className={` lg:top-0 absolute flex justify-between m-0 w-full ${isFilterApplied ? 'top-80' : 'top-50'}`}
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
                className="w-[192px] md:w-[217px] text-default-btn text-medium text-base"
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
                      sorting === 'newest' && 'text-orange'
                    )}
                  >
                    Останні оголошення
                  </button>
                  <button
                    onClick={handleDescSorting}
                    className={cn(
                      'text-default-btn text-left text-lg focus:outline-none hover:text-orange transition-all duration-300',
                      sorting === 'oldest' && 'text-orange'
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
              className="z-50 fixed xl:relative inset-0 flex items-start bg-black/50 xl:bg-transparent xl:w-1/4 xl:h-fit"
              onClick={() => {
                setOpenFilters(false);
              }}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                onClick={e => e.stopPropagation()}
                className={cn(
                  'xl:flex flex-col transition-all duration-500 xl:bg-transparent',
                  'xl:static  xl:gap-32',
                  'flex flex-col bg-dialog p-16 gap-16 rounded-4xl w-[95%] sm:w-[344px] ml-16 mt-[260px] xl:mt-0 xl:ml-0 xl:p-0'
                )}
              >
                <Controller
                  name="animalType"
                  control={control}
                  render={({ field }) => (
                    <FilterItem
                      {...field}
                      label="Вид тварини"
                      items={animalTypeOptions}
                    />
                  )}
                />
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <FilterItem {...field} label="Стать" items={genderOption} />
                  )}
                />
                <Controller
                  name="breed"
                  control={control}
                  render={({ field }) => (
                    <BreedSelect
                      {...field}
                      className="w-full h-[40px]"
                      type={selectedAnimalType}
                      placeholder="Порода"
                    />
                  )}
                />
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <CitySelect
                      {...field}
                      className="h-[40px]"
                      widthClass="w-full"
                      placeholder="Місто"
                    />
                  )}
                />
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <FilterItem {...field} label="Вік" items={ageOption} />
                  )}
                />

                <Controller
                  name="size"
                  control={control}
                  render={({ field }) => (
                    <FilterItem {...field} label="Розмір" items={size} />
                  )}
                />

                <CustomButton
                  type="submit"
                  styleType="defaultButton"
                  className="self-center m-0"
                  loading={isLoading || isFetching}
                >
                  Застосувати фільтр
                </CustomButton>
                <CustomButton
                  type="button"
                  styleType="whiteButton"
                  className="self-center m-0 xl:-mt-12 mb-50 lg:mb-100"
                  onClick={handleClearFilter}
                  disabled={Object.keys(filtersParams).length === 0}
                >
                  Очистити фільтр
                </CustomButton>
              </form>
            </div>
          )}

          <div
            className={`w-full grid gap-16 lg:gap-20 mb-32 md:mb-50 wrap justify-center transition-all duration-500 grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 ${openFilters ? 'xl:grid-cols-3 w-3/4' : 'xl:grid-cols-4'}`}
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
