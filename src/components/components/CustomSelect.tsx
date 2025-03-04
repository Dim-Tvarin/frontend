import type { FC, ReactNode } from 'react';
import { Select, SelectTrigger, SelectContent, SelectValue } from './ui/select';
import { cn } from 'components/lib/utils';

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  placeholder?: string;
  className?: string;
}

const CustomSelect: FC<CustomSelectProps> = ({
  label,
  className,
  value,
  onChange,
  children,
  placeholder = 'Оберіть варіант',
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-left h-[20px] font-medium text-[16px] text-input-label mb-[10px]">
          {label}
        </label>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className={cn(
            'border border-input-border rounded-[20px] px-[28px] py-[14px] h-[48px] text-input-border',
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="text-input-border rounded-[16px]">
          {children}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
