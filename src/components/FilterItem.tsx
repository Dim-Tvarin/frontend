import { FaChevronDown } from 'react-icons/fa6';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './components/ui/popover';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { Label } from './components/ui/label';
import { Button } from './components/ui/button';
import { useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { cn } from './lib/utils';

type Item = {
  value: string;
  label: string;
};

const FilterItem = ({
  label,
  value,
  items,
  onChange,
  className = '',
}: {
  label: string;
  value?: string;
  className?: string;
  items: Item[];
  onChange: (val: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const windowSize = useWindowSize();

  const handleValueChange = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="hover:border-input-border">
        <Button
          variant="outline"
          role="combobox"
          className={`flex justify-between px-16 border-1 border-input-border rounded-lg w-full h-[40px] text-default-btn text-medium text-base ${className}`}
        >
          {items.find(i => i.value === value)?.label || label}
          <FaChevronDown color="#042D4A" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          'shadow-none p-4 border-1 border-input-border w-(--radix-popover-trigger-width) text-default-btn -mt-4 dark:bg-main',
          windowSize.width && windowSize.width < 1280 ? 'bg-dialog' : 'bg-white'
        )}
      >
        <RadioGroup value={value} onValueChange={handleValueChange}>
          {items.map(item => (
            <div
              key={item.value}
              className="flex items-center gap-8 p-8 w-full h-40"
            >
              <RadioGroupItem
                value={item.value}
                id={item.value}
                className="focus:outline-none ring-[1px] data-[state=checked]:ring-2 w-20 h-20 text-default-btn"
              />
              <Label htmlFor={item.value} className="text-base">
                {item.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
};

export default FilterItem;
