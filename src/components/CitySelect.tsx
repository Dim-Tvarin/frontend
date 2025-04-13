import { useState } from "react";

import { Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./components/ui/button";
import { Command, CommandInput, CommandItem, CommandList } from "./components/ui/command";
import FormError from "./FormError";
import { useGetCitiesQuery } from "src/redux/animals/addInfoApi";


const cities = [
  "Київ", "Харків", "Одеса", "Дніпро", "Львів", "Запоріжжя", "Вінниця", "Миколаїв", "Полтава", "Черкаси",
  "Чернівці", "Тернопіль", "Івано-Франківськ", "Суми", "Рівне", "Луцьк", "Ужгород", "Хмельницький", "Житомир", "Чернігів"
];

export function CitySelect({ onChange, className, errorMess }: { onChange: (city: string) => void; className?: string; errorMess?: string;}) {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  const {data, isLoading, error} = useGetCitiesQuery()

  console.log('data', data, isLoading, error);

  return (
    <>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={`${className} w-[305px] justify-between border-input-border px-16 text-lg text-medium`}>
          {selectedCity || "Оберіть населенний пункт"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[305px] p-0  border-1 border-input-border rounded-t-lg ">
        <Command>
          <CommandInput placeholder="Пошук міста..." />
          <CommandList className="bg-white border-1 border-input-border rounded-b-lg">
            {cities.map((city) => (
              <CommandItem
                className="text-lg text-default-btn px-16"
                key={city}
                value={city}
                onSelect={() => {
                  setSelectedCity(city);
                  onChange?.(city);
                  setOpen(false);
                }}
              >
                {city} {selectedCity === city && <Check className="ml-auto w-10 h-4" />}
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
