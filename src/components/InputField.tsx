import type { FC } from 'react';
import { Input } from './components/ui/input';
import { cn } from './lib/utils';
import { MdErrorOutline } from 'react-icons/md';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  error?: string;
}

export const InputField: FC<InputFieldProps> = ({
  label,
  id,
  error,
  className,
  ...rest
}) => {
  return (
    <div className="w-full ">
      {label && (
        <label
          htmlFor={id}
          className="block text-left h-[20px] font-medium text-[16px] text-input-label mb-[10px]"
        >
          {label}
        </label>
      )}
      <Input
        id={id}
        className={cn(
          'border border-input-border rounded-[8px] px-[28px] py-[14px] h-[48px] placeholder:text-input-border',
          className
        )}
        {...rest}
      />
      {error && (
        <div className="flex items-center mt-[10px] gap-[4px]">
          <MdErrorOutline size={18} className="text-error" />
          <p className="text-left text-error text-xs">{error}</p>
        </div>
      )}
    </div>
  );
};
