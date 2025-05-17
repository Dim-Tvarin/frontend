import {
  useGetAnimaltraitsQuery,
  type AnimalTrait,
} from 'src/redux/animals/addInfoApi';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from './components/ui/command';
import { Button } from './components/ui/button';
import { useEffect, useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import FormError from './FormError';
import { useDebounce } from '@uidotdev/usehooks';
import { InputField } from './InputField';
import { AnimalType, type AnimalTypeValues } from 'pages/Announcement/types';

const getFilteredBreed = (
  data: Pick<AnimalTrait, '_id' | 'breed'>[],
  searchVal: string
): Pick<AnimalTrait, '_id' | 'breed'>[] => {
  const search = searchVal.toLocaleLowerCase();
  return data.filter(i => i.breed.toLowerCase().includes(search));
};

const defaultBreeds: Record<
  Exclude<AnimalType, AnimalType.other>,
  Pick<AnimalTrait, '_id' | 'breed'>[]
> = {
  dogs: [
    { _id: '67fb8ea44b0d6673ac919d07', breed: 'Невідомо' },
    { _id: '67fb8ea44b0d6673ac919c3a', breed: "Австралійський тер'єр" },
    { _id: '67fb8ea44b0d6673ac919c42', breed: 'Американський бульдог' },
    { _id: '67fb8ea44b0d6673ac919c4b', breed: 'Англійський бульдог' },
    { _id: '67fb8ea44b0d6673ac919c4c', breed: 'Англійський кокер спанієль' },
    { _id: '67fb8ea44b0d6673ac919c5b', breed: 'Бельгійська вівчарка лакенуа' },
    { _id: '67fb8ea44b0d6673ac919c60', breed: 'Бігль' },
    { _id: '67fb8ea44b0d6673ac919c64', breed: 'Боксер' },
    { _id: '67fb8ea44b0d6673ac919c89', breed: 'Доберман' },
    { _id: '67fb8ea44b0d6673ac919c8d', breed: 'Золотистий ретрівер' },
    { _id: '67fb8ea44b0d6673ac919c95', breed: 'Іспанський мастиф' },
    { _id: '67fb8ea44b0d6673ac919ca3', breed: 'Коллі' },
    { _id: '67fb8ea44b0d6673ac919cb7', breed: 'Мопс' },
    { _id: '67fb8ea44b0d6673ac919cba', breed: 'Німецька вівчарка' },
  ],
  cats: [
    { _id: '67fb8ea44b0d6673ac919d08', breed: 'Невідомо' },
    { _id: '67fb8ea44b0d6673ac919d48', breed: 'Сіамська кішка' },
    { _id: '67fb8ea44b0d6673ac919d3f', breed: 'Персидська кішка' },
    { _id: '67fb8ea44b0d6673ac919d35', breed: 'Мейн кун' },
    { _id: '67fb8ea44b0d6673ac919d28', breed: 'Канадський сфінкс' },
    { _id: '67fb8ea44b0d6673ac919d24', breed: 'Єгипетська мау' },
    { _id: '67fb8ea44b0d6673ac919d16', breed: 'Бенгальська кішка' },
  ],
  birds: [
    { _id: '67fb8ea44b0d6673ac919d90', breed: 'Невідомо' },
    { _id: '67fb8ea44b0d6673ac919d68', breed: 'Хвилястий папуга' },
    { _id: '67fb8ea44b0d6673ac919d6a', breed: 'Ара' },
    { _id: '67fb8ea44b0d6673ac919d6d', breed: 'Канарейка' },
    { _id: '67fb8ea44b0d6673ac919d6e', breed: 'Нерозлучник' },
    { _id: '67fb8ea44b0d6673ac919d74', breed: 'Амазонський папуга' },
    { _id: '67fb8ea44b0d6673ac919d7d', breed: 'Какаду білоголовий' },
    { _id: '67fb8ea44b0d6673ac919d83', breed: 'Півень (декоративний)' },
    {
      _id: '67fb8ea44b0d6673ac919d86',
      breed: 'Голуб звичайний (поштова порода)',
    },
    { _id: '67fb8ea44b0d6673ac919d8a', breed: 'Лебідь-шипун' },
  ],
};

const defaultTypes: Exclude<AnimalTypeValues, 'other'>[] = [
  AnimalType.dogs,
  AnimalType.cats,
  AnimalType.birds,
];

const isDefaultAnimalType = (
  value: string
): value is Exclude<AnimalTypeValues, 'other'> => {
  return defaultTypes.includes(value as Exclude<AnimalTypeValues, 'other'>);
};

const BreedSelect = ({
  type,
  defaultValue,
  onChange,
  className,
  errorMess,
}: {
  type?: AnimalTypeValues | string;
  defaultValue?: string;
  onChange: (breed: string) => void;
  className?: string;
  errorMess?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [filteredBreed, setFilteredBreed] = useState<
    Pick<AnimalTrait, '_id' | 'breed'>[]
  >([]);
  const [searchValue, setSearchValue] = useState('');
  const { data, isLoading } = useGetAnimaltraitsQuery();
  const debouncedSearch = useDebounce(searchValue, 300);

  useEffect(() => {
    if (type === 'other') {
      setSelectedBreed('');
    } else {
      if (selectedBreed) {
        setSelectedBreed(
          defaultBreeds[type as Exclude<AnimalType, 'other'>][0].breed
        );
      }
    }
  }, [type]);

  useEffect(() => {
    if (defaultValue) {
      setSelectedBreed(defaultValue);
      onChange?.(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    let animalBreed: Pick<AnimalTrait, '_id' | 'breed'>[] = [];
    if (!data || !type || !isDefaultAnimalType(type)) {
      return;
    }
    if (defaultTypes.includes(type)) {
      const filteredByType: AnimalTrait[] = data?.[type] || [];
      const mapFilteredData = filteredByType.map(({ _id, breed }) => ({
        _id,
        breed,
      }));

      if (
        !isLoading &&
        data &&
        filteredByType?.length > 0 &&
        searchValue.length > 2
      ) {
        animalBreed = getFilteredBreed(mapFilteredData, searchValue);
      } else {
        animalBreed = defaultBreeds[type];
      }
      setFilteredBreed(animalBreed);
    }
  }, [debouncedSearch, data, isLoading, type]);

  if (type && !isDefaultAnimalType(type)) {
    return (
      <>
        <InputField
          defaultValue={selectedBreed}
          value={selectedBreed}
          id="animBeed"
          placeholder="Введіть породу"
          className="w-full lg:w-[305px] h-[40px]"
          onChange={e => {
            setSelectedBreed(e.target.value);
            onChange?.(e.target.value);
          }}
        />
        {errorMess && <FormError error={errorMess} />}
      </>
    );
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={type === undefined}
            className={`${className} justify-between border-input-border px-16 text-base text-medium text-default-btn`}
          >
            {selectedBreed || 'Оберіть породу'}
            {open ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="z-10 p-0 border-1 border-input-border rounded-t-lg">
          <Command className="bg-white">
            <CommandInput
              placeholder="Пошук ..."
              onValueChange={val => setSearchValue(val)}
            />
            <CommandList className="bg-white border-1 border-input-border rounded-b-lg">
              {filteredBreed.map(
                (breed: Pick<AnimalTrait, '_id' | 'breed'>) => (
                  <CommandItem
                    className="px-16 text-default-btn text-base text-left"
                    key={breed._id}
                    value={breed.breed}
                    onSelect={() => {
                      setSelectedBreed(breed.breed);
                      onChange?.(breed.breed);
                      setOpen(false);
                    }}
                  >
                    {breed.breed}
                    {selectedBreed === breed.breed && <BsCheckLg />}
                  </CommandItem>
                )
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {errorMess && <FormError error={errorMess} />}
    </>
  );
};

export default BreedSelect;
