import type { FC } from 'react';
import { Label } from './components/ui/label';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { cn } from './lib/utils';
import { CustomLabel } from './CustomLabel';
import FormError from './FormError';

type Item = {
  value: string;
  label: string;
};

interface RadioProps {
  ref?: React.Ref<HTMLDivElement>;
  name?: string;
  value?: string;
  className?: string;
  items: Item[];
  groupLabel?: string;
  labelSize?: string;
  labelClass?: string;
  itemWidth?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
}

const CustomRadioGroup: FC<RadioProps> = ({
  ref,
  name,
  value,
  items,
  className,
  groupLabel,
  itemWidth,
  labelClass,
  labelSize = '[16px]',
  onChange,
  onBlur,
  error,
}) => {
  return (
    <div className="flex flex-col flex-wrap w-full">
      {groupLabel && (
        <CustomLabel labelSize={labelSize} labelClass={labelClass}>
          {groupLabel}
        </CustomLabel>
      )}
      <RadioGroup
        ref={ref}
        name={name}
        value={value}
        className={cn('flex gap-20', className)}
        onBlur={onBlur}
        onValueChange={onChange}
      >
        {items.map(item => (
          <Label
            htmlFor={item.value}
            className={cn(
              'flex items-center gap-8 rounded-lg py-8 px-16 border-1 border-input-border h-40 text-base w-full md:w-[300px] lg:w-[305px]',
              itemWidth ? `w-[${itemWidth}px]` : 'w-full',
              { 'border-error-input': error }
            )}
            key={item.value}
          >
            <RadioGroupItem
              checked={item.value === value}
              value={item.value}
              id={item.value}
              className="focus:outline-none ring-[1px] data-[state=checked]:ring-2 w-20 h-20 text-base"
            />
            {item.label}
          </Label>
        ))}
      </RadioGroup>
      {error && <FormError error={error} />}
    </div>
  );
};

export default CustomRadioGroup;
