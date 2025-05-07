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
      <div className=" relative flex justify-center mt-100 mb-50">
        <CustomButton
          type="button"
          styleType="defaultButton"
          className="w-[129px] m-0 absolute top-0 left-0"
          onClick={() => setOpenFilters(prev => !prev)}
        >
          <FiFilter size={18} />
          <span className="text-base">Фільтр</span>
        </CustomButton>
        <div className="flex flex-col">
          <h1 className="text-[32px]">{title}</h1>
          {isFilterApplied && data && (
            <p className="text-lg text-center text-default-btn w-full">
              {data.total === 0
                ? 'По вашому запиту нічого не знайдено'
                : `По вашому запиту знайдено ${data.total} тварини`}
            </p>
          )}
        </div>
        <div className="absolute top-0 right-0 z-10 flex items-end flex-col">
          <CustomButton
            type="button"
            styleType="whiteButton"
            className="w-[217px] m-0 text-base text-medium text-default-btn"
            onClick={() => setOpenSorting(prev => !prev)}
          >
            Сортування за датою
          </CustomButton>
          {openSorting && (
            <div className="bg-dialog border-1 border-default-btn rounded-xl flex flex-col gap-4 px-16 py-10">
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
      {isLoading ? (
        <PetsListSkeleton />
      ) : (
        <div className="flex gap-20">
          {openFilters && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-1/4 flex flex-col gap-32 transition-all duration-500"
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
                    className="w-[305px] h-[40px]"
                    type={selectedAnimalType}
                  />
                )}
              />
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <CitySelect {...field} className="w-[305px] h-[40px]" />
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
                className="m-0 self-center"
                loading={isLoading || isFetching}
              >
                Застосувати фільтр
              </CustomButton>
              <CustomButton
                type="button"
                styleType="whiteButton"
                className="m-0 self-center"
                onClick={handleClearFilter}
                disabled={Object.keys(filtersParams).length === 0}
              >
                Очистити фільтр
              </CustomButton>
            </form>
          )}

          <div
            className={`grid gap-20 mb-50 wrap transition-all duration-500 ${openFilters ? 'grid-cols-3 w-3/4' : 'grid-cols-4'}`}
          >
            {data?.animals.map(item => (
              <AnimalCard
                key={item.id}
                id={item.id}
                name={item.animalName}
                gender={item.gender}
                age={item.age}
                photoSrc={item.animalImages[0].url}
                favorite={item.favorite}
                status={item.status}
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
          className="mb-100"
        />
      )}
    </div>
  );
};

export default PetsList;
