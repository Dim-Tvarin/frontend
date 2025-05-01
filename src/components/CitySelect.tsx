import { useEffect, useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { Button } from './components/ui/button';
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from './components/ui/command';
import FormError from './FormError';
import { useGetCitiesQuery } from 'src/redux/animals/addInfoApi';
import { useDebounce } from '@uidotdev/usehooks';

interface CityType {
  _id: string;
  name: string;
}

const getFilteredCities = (data: CityType[], searchVal: string): CityType[] => {
  const search = searchVal.toLocaleLowerCase();
  return data.filter(i => i.name.toLowerCase().startsWith(search));
};

const defaultCities: CityType[] = [
  { _id: '67f7daf6405f8609b0a0eb1f', name: 'Київ' },
  { _id: '67f7daf6405f8609b0a12d2a', name: 'Харків' },
  { _id: '67f7daf6405f8609b0a10b3a', name: 'Одеса' },
  { _id: '67f7daf6405f8609b0a0c8c1', name: 'Дніпро' },
  { _id: '67f7daf6405f8609b0a0fc90', name: 'Львів' },
  { _id: '67f7daf6405f8609b0a0e1b9', name: 'Запоріжжя' },
  { _id: '67f7daf6405f8609b0a0baeb', name: 'Вінниця' },
  { _id: '67f7daf6405f8609b0a106b2', name: 'Миколаїв' },
  { _id: '67f7daf6405f8609b0a1119b', name: 'Полтава' },
  { _id: '67f7daf7405f8609b0a1408b', name: 'Черкаси' },
  { _id: '67f7daf7405f8609b0a145ba', name: 'Чернівці' },
  { _id: '67f7daf6405f8609b0a1272a', name: 'Тернопіль' },
  { _id: '67f7daf6405f8609b0a0e64e', name: 'Івано-Франківськ' },
  { _id: '67f7daf6405f8609b0a11ffb', name: 'Суми' },
  { _id: '67f7daf6405f8609b0a11abc', name: 'Рівне' },
  { _id: '67f7daf6405f8609b0a0c36f', name: 'Луцьк' },
  { _id: '67f7daf6405f8609b0a0de11', name: 'Ужгород' },
  { _id: '67f7daf7405f8609b0a1396a', name: 'Хмельницький' },
  { _id: '67f7daf6405f8609b0a0d5e4', name: 'Житомир' },
  { _id: '67f7daf7405f8609b0a14823', name: 'Чернігів' },
];

export function CitySelect({
  value,
  onChange,
  className,
  errorMess,
}: {
  value?: string;
  onChange: (city: string) => void;
  className?: string;
  errorMess?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(value || '');
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState<CityType[]>([]);
  const debouncedSearch = useDebounce(searchValue, 300);

  const { data, isLoading } = useGetCitiesQuery();

  useEffect(() => {
    setSelectedCity(value || '');
  }, [value]);

  useEffect(() => {
    let cities: CityType[] = [];
    if (!isLoading && data && data?.length > 0 && searchValue.length > 2) {
      cities = getFilteredCities(data, searchValue);
    } else {
      cities = defaultCities;
    }
    setFilteredData(cities);
  }, [debouncedSearch, data, isLoading]);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-[305px] justify-between border-input-border px-16 text-medium text-default-btn ${className} `}
          >
            {selectedCity || 'Оберіть населенний пункт'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[305px] p-0  border-1 border-input-border rounded-t-lg z-10">
          <Command>
            <CommandInput
              placeholder="Пошук міста..."
              onValueChange={val => setSearchValue(val)}
            />
            <CommandList className="border-1 border-input-border bg-white rounded-b-lg ">
              {filteredData.map(city => (
                <CommandItem
                  className="text-lg text-default-btn px-16 text-left "
                  key={city._id}
                  value={city.name}
                  onSelect={() => {
                    setSelectedCity(city.name);
                    onChange?.(city.name);
                    setOpen(false);
                  }}
                >
                  {city.name} {selectedCity === city.name && <BsCheckLg />}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {errorMess && <FormError error={errorMess} />}
    </>
  );
}
