import { useState } from "react";

import { Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./components/ui/button";
import { Command, CommandInput, CommandItem, CommandList } from "./components/ui/command";

const cities = [
  "Київ", "Харків", "Одеса", "Дніпро", "Львів", "Запоріжжя", "Вінниця", "Миколаїв", "Полтава", "Черкаси",
  "Чернівці", "Тернопіль", "Івано-Франківськ", "Суми", "Рівне", "Луцьк", "Ужгород", "Хмельницький", "Житомир", "Чернігів"
];

export function CitySelect({ onChange, className }: { onChange: (city: string) => void; className?: string; }) {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={`${className} w-[305px] justify-between border-input-border`}>
          {selectedCity || "Оберіть місто"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[305px] p-0 border-1 border-input-border">
        <Command>
          <CommandInput placeholder="Поиск города..." className="rounded-[8px]"/>
          <CommandList className="bg-white border-1 border-input-border">
            {cities.map((city) => (
              <CommandItem
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
  );
}