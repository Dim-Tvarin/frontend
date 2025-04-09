import type { FC, ReactNode } from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from './components/ui/select';
import { cn } from 'components/lib/utils';
import { CustomLabel } from './CustomLabel';
import FormError from './FormError';

interface CustomSelectProps {
  label?: string;
  labelSize?: string;
  labelClass?: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  placeholder?: string;
  className?: string;
  error?: string;
}

const CustomSelect: FC<CustomSelectProps> = ({
  label,
  labelClass,
  labelSize = '[16px]',
  className,
  value,
  onChange,
  children,
  placeholder = 'Оберіть варіант',
  error,
}) => {
  return (
    <div className="w-full [&_button>svg]:size-16 ">
      {label && (
        <CustomLabel labelSize={labelSize} labelClass={labelClass}>
          {label}
        </CustomLabel>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className={cn(
            'border border-input-border rounded-[20px] px-[28px] py-[14px] h-[48px] text-input-border flex justify-between',
            { 'border-error-input': error },
            className
          )}
        >
          <SelectValue
            placeholder={placeholder}
            className="[&_span>svg]:size-16"
          />
        </SelectTrigger>
        <SelectContent className="text-input-border rounded-[16px] [&_span>svg]:size-12">
          {children}
        </SelectContent>
      </Select>
      {error && <FormError error={error} />}
    </div>
  );
};

export default CustomSelect;
