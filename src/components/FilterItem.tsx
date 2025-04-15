import { FaChevronDown } from "react-icons/fa6";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";

type Item = {
  value: string
  label: string
}

const FilterItem = ({ label,
  value,
  items,
  onChange}: 
  { label: string;
  value?: string;
  items: Item[];
  onChange: (val: string) => void;}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full max-w-[305px] justify-between border-1 border-input-border px-16 text-lg text-medium rounded-lg text-default-btn"
        >
          {items.find(i => i.value === value)?.label || label}
          <FaChevronDown color="#042D4A" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4  border-1 border-input-border shadow-none text-default-btn w-[305px] bg-white">
        <RadioGroup value={value} onValueChange={onChange}>
          {items.map(item => (
            <div
              key={item.value}
              className="w-full flex items-center gap-8 p-8 h-40"
            >
              <RadioGroupItem
                value={item.value}
                id={item.value}
                className="ring-[1px] w-20 h-20 data-[state=checked]:ring-2 focus:outline-none text-default-btn"
              />
              <Label htmlFor={item.value} className="text-lg">
                {item.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
}

export default FilterItem;
