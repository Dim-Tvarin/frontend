import BreedSelect from './BreedSelect';
import { CitySelect } from './CitySelect';
import { CustomButton } from './CustomButton';
import FilterItem from './FilterItem';

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

interface AdvertsFilterProps {
  filters: AnimalsFilters;
  onChange: <K extends keyof AnimalsFilters>(
    key: K,
    value: AnimalsFilters[K]
  ) => void;
  onReset: () => void;
  onSubmit: () => void;
}

const AdvertsFilter = ({
  filters,
  onChange,
  onReset,
  onSubmit,
}: AdvertsFilterProps) => {
  return (
    <div className="flex flex-col gap-16 w-[305px]">
      <FilterItem
        label="Вид тварини"
        value={filters.animalType}
        items={[
          { value: 'cats', label: 'Котики' },
          { value: 'dogs', label: 'Собаки' },
          { value: 'birds', label: 'Пташки' },
          { value: 'other', label: 'Інші тварини' },
        ]}
        onChange={val =>
          onChange('animalType', val as AnimalsFilters['animalType'])
        }
      />
      <FilterItem
        label="Стать"
        value={filters.gender}
        items={[
          { value: 'male', label: 'Хлопчик' },
          { value: 'female', label: 'Дівчинка' },
        ]}
        onChange={val =>
          onChange('animalType', val as AnimalsFilters['animalType'])
        }
      />
      <BreedSelect
        type={filters.animalType}
        className="w-[305px] h-[40px]"
        onChange={val => onChange('breed', val as AnimalsFilters['breed'])}
        errorMess={undefined}
      />
      <CitySelect
        value={filters.location}
        onChange={val =>
          onChange('location', val as AnimalsFilters['location'])
        }
        className="w-[305px] h-[40px]"
        errorMess={undefined}
      />
      <FilterItem
        label="Вік"
        value={filters.age}
        items={[
          {
            value: 'до 1 року',
            label: 'до 1 року',
          },
          {
            value: '1-3 роки',
            label: '1-3 роки',
          },
          {
            value: '3-5 років',
            label: '3-5 років',
          },
          {
            value: 'Старше 5 років',
            label: 'Старше 5 років',
          },
        ]}
        onChange={val => onChange('age', val as AnimalsFilters['age'])}
      />
      <FilterItem
        label="Розмір"
        value={filters.size}
        items={[
          { value: 'Малий', label: 'маленький' },
          { value: 'Середній', label: 'середній' },
          { value: 'Великий', label: 'великий' },
        ]}
        onChange={val => onChange('size', val as AnimalsFilters['size'])}
      />
      <FilterItem
        label="Статус"
        value={filters.status}
        items={[
          { value: 'active', label: 'Шукають господаря' },
          { value: 'inactive', label: 'Знайшли родину' },
        ]}
        onChange={val => onChange('status', val as AnimalsFilters['status'])}
      />
      <FilterItem
        label="Сортування за датою"
        value={filters.sortByDate}
        items={[
          { value: 'newest', label: 'Спочатку нові' },
          { value: 'oldest', label: 'Спочатку старі' },
        ]}
        onChange={val =>
          onChange('sortByDate', val as AnimalsFilters['sortByDate'])
        }
      />
      <CustomButton
        onClick={onSubmit}
        styleType="defaultButton"
        className="w-full"
      >
        Застосувати фільтр
      </CustomButton>
      <CustomButton
        onClick={onReset}
        styleType="whiteButton"
        className="w-full"
      >
        Очистити фільтр
      </CustomButton>
    </div>
  );
};

export default AdvertsFilter;
