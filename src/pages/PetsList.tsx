import { FiFilter } from "react-icons/fi";
import { CustomButton } from "components/CustomButton";
import { useGetFilteredAnimalsQuery } from "src/redux/animals/animalsApi";
import AnimalCard from "components/AnimalCard";
import { PetsListSkeleton } from "components/sceletons/PetsListSkeleton";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { showToast } from "components/Toast";
import FilterItem from "components/FilterItem";
import { age, animalType, AnimalTypeEnum, gender, size } from "./Announcement/types";
import BreedSelect from "components/BreedSelect";
import { CitySelect } from "components/CitySelect";
import { Controller, useForm } from "react-hook-form";

const limit = 4

interface FilterFormValues {
  animalType: AnimalTypeEnum | undefined;
  gender: string;
  breed: string;
  location: string;
  age: string;
  size: string;
}

const mapAnimalType = {
  cats: "Котики",
  dogs: "Собаки",
  birds: 'Пташки',
  other: "Інші тварини"
}

const PetsList = () => {
  const [page, setPage] = useState(1);
  const [openFilters, setOpenFilters] = useState(false)
  const [openSorting, setOpenSorting] = useState(false)
  const [filtersParams, setFiltersParams] = useState<Partial<FilterFormValues>>({})
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, isFetching, error } = useGetFilteredAnimalsQuery({page, limit, ...filtersParams},{ skip: !filtersParams } )
  const { control, handleSubmit, watch } = useForm<FilterFormValues>({
    defaultValues: {
      animalType: undefined,
      gender: '',
      breed: '',
      location: '',
      age: '',
      size: '',
    },
  });
  const selectedAnimalType = watch('animalType') ;
  const totalPages = data && Math.ceil(data?.total / limit);
  const title = filtersParams && filtersParams?.animalType ? mapAnimalType[filtersParams?.animalType] : 'Всі тварини'


  if (error) {
    showToast({
      title: 'Щось пішло не по плану',
      description: 'Спробуйте ще раз пізніше',
      status: 'error',
    })
    navigate('/')
  }

  useEffect(()=> {
    if (Object.keys(filtersParams).length > 0 && !isLoading && !isFetching)
    setIsFilterApplied(true) }, [isFetching, filtersParams, isLoading])

  const onSubmit = (formData: FilterFormValues) => {
    setFiltersParams(formData);
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
              { data.total === 0 ? 'По вашому запиту нічого не знайдено' : `По вашому запиту знайдено ${data.total} тварини`}
            </p>
          )}
        </div>
        <CustomButton
          type="button"
          styleType="whiteButton"
          className="w-[217px] m-0 absolute top-0 right-0 text-base text-medium"
          onClick={() => setOpenSorting(prev => !prev)}
        >
          Сортування за датою
        </CustomButton>
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
                    items={animalType}
                  />
                )}
              />
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <FilterItem {...field} label="Стать" items={gender} />
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
                  <FilterItem {...field} label="Вік" items={age} />
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
                className="m-0"
                loading={isLoading || isFetching}
              >
                Застосувати фільтр
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
                photoSrc={item.animalImages[0]}
                favorite={item.favorite}
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
}

export default PetsList;

