import type { FC } from 'react';
import { Label } from './components/ui/label';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { cn } from './lib/utils';
import { MdErrorOutline } from 'react-icons/md';

type Item = {
  value: string;
  label: string;
};

interface RadioProps {
  defaultValue?: string;
  className?: string;
  items: Item[];
  groupLabel?: string;
  onChange: (value: string) => void;
  error?: string;
}

const CustomRadioGroup: FC<RadioProps> = ({
  defaultValue,
  items,
  className,
  groupLabel,
  onChange,
  error,
}) => {
  return (
    <div className="flex flex-col">
      {groupLabel && (
        <label className="block text-left h-[20px] font-medium text-[16px] text-input-label mb-[10px]">
          {groupLabel}
        </label>
      )}
      <RadioGroup
        defaultValue={defaultValue}
        className={cn('flex gap-20', className)}
        onValueChange={onChange}
      >
        {items.map(item => (
          <div
            className="flex items-center gap-8 rounded-lg p-8 border-1 border-input-border w-full h-40"
            key={item.value}
          >
            <RadioGroupItem
              value={item.value}
              id={item.value}
              className="ring-[1px] w-20 h-20 data-[state=checked]:ring-2 focus:outline-none"
            />
            <Label htmlFor={item.value}>{item.label}</Label>
          </div>
        ))}
      </RadioGroup>
      {error && (
        <div className="flex items-center mt-[10px] gap-[4px]">
          <MdErrorOutline size={18} className="text-error" />
          <p className="text-left text-error text-xs">{error}</p>
        </div>
      )}
    </div>
  );
};

export default CustomRadioGroup;
