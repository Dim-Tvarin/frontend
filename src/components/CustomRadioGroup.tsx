import type { FC } from 'react';
import { Label } from './components/ui/label';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { cn } from './lib/utils';
import { MdErrorOutline } from 'react-icons/md';
import { CustomLabel } from './CustomLabel';

type Item = {
  value: string;
  label: string;
};

interface RadioProps {
  defaultValue?: string;
  className?: string;
  itemWidth?: string;
  items: Item[];
  groupLabel?: string;
  labelSize?: string;
  labelClass?: string;
  onChange: (value: string) => void;
  error?: string;
}

const CustomRadioGroup: FC<RadioProps> = ({
  defaultValue,
  items,
  itemWidth,
  className,
  groupLabel,
  labelClass,
  labelSize = '[16px]',
  onChange,
  error,
}) => {
  return (
    <div className="flex flex-col">
      {groupLabel && (
        <CustomLabel labelSize={labelSize} labelClass={labelClass}>
          {groupLabel}
        </CustomLabel>
      )}
      <RadioGroup
        defaultValue={defaultValue}
        className={cn('flex gap-20', className)}
        onValueChange={onChange}
      >
        {items.map(item => (
          <div
            className={cn(
              ' flex items-center gap-8 rounded-lg p-8 border-1 border-input-border h-40',
              itemWidth ? `w-[${itemWidth}px]` : 'w-full'
            )}
            key={item.value}
          >
            <RadioGroupItem
              value={item.value}
              id={item.value}
              className="ring-[1px] w-20 h-20 data-[state=checked]:ring-2 focus:outline-none"
            />
            <Label htmlFor={item.value} className="text-lg">
              {item.label}
            </Label>
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
