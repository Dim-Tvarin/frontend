import FilterItem from 'components/FilterItem';
import {
  ageOption,
  animalTypeOptions,
  AnimalType,
  genderOption,
  size,
} from 'pages/Announcement/types';
import BreedSelect from 'components/BreedSelect';
import { CitySelect } from 'components/CitySelect';
import { Controller, useForm } from 'react-hook-form';
import { cn } from './lib/utils';
import { useCallback } from 'react';
import { CustomButton } from './CustomButton';
import FileterLabel from './FileterLabel';
import { getActiveFilters } from 'pages/PetsList/mapping';
import { useFilters } from 'src/context/FiltersContext';

export interface FilterFormValues {
  animalType: AnimalType | undefined;
  gender: string;
  breed: string;
  location: string;
  age: string;
  size: string;
  sortByDate?: 'newest' | 'oldest';
}

const Filter = ({
  onSubmit,
  isLoading = false,
  isFetching = false,
  onClose,
}: {
  onSubmit: (formData: FilterFormValues) => void;
  isLoading?: boolean;
  isFetching?: boolean;
  onClose: () => void;
}) => {
  const { filtersParams, setFiltersParams } = useFilters();

  const { control, handleSubmit, watch, reset, resetField } =
    useForm<FilterFormValues>({
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

  const handleClearFilter = () => {
    setFiltersParams({});
    reset();
  };

  const handleDeleteFilterItem = useCallback(
    (item: keyof FilterFormValues) => {
      setFiltersParams(prev => {
        const newParams = { ...prev };
        delete newParams[item];
        return newParams;
      });
      resetField(item);
      onClose();
    },
    [resetField]
  );
  const activeFilterItems = getActiveFilters(filtersParams);

  return (
    <>
      <div className="flex flex-wrap gap-x-16 gap-y-10 xl:mb-32 ml-16 xl:ml-0 max-w-[344px]">
        {activeFilterItems.length > 0 &&
          activeFilterItems.map(({ key, value }) => (
            <FileterLabel
              key={key}
              label={value}
              onRemove={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                handleDeleteFilterItem(key as keyof FilterFormValues);
              }}
            />
          ))}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={e => e.stopPropagation()}
        className={cn(
          'xl:flex flex-col transition-all duration-500 xl:bg-transparent',
          'xl:static  xl:gap-32',
          'flex flex-col bg-dialog p-16 gap-16 rounded-4xl w-[344px] xl:w-[306px]  xl:mt-0  xl:p-0'
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
              className="text-default-btn"
            />
          )}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <FilterItem
              {...field}
              label="Стать"
              items={genderOption}
              className="text-default-btn"
            />
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
            <FilterItem
              {...field}
              label="Вік"
              items={ageOption}
              className="text-default-btn"
            />
          )}
        />

        <Controller
          name="size"
          control={control}
          render={({ field }) => (
            <FilterItem
              {...field}
              label="Розмір"
              items={size}
              className="text-default-btn"
            />
          )}
        />

        <CustomButton
          type="submit"
          styleType="defaultButton"
          className="self-center m-0 mt-[34px]"
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
    </>
  );
};

export default Filter;
