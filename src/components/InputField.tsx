import type { FC } from 'react';
import { Input } from './components/ui/input';
import { cn } from './lib/utils';
import { MdErrorOutline } from 'react-icons/md';
import { CustomLabel } from './CustomLabel';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  error?: string;
  labelSize?: string;
  labelClass?: string;
}

export const InputField: FC<InputFieldProps> = ({
  id,
  label,
  className,
  labelClass,
  labelSize = 'xs',
  error,
  ...rest
}) => {
  return (
    <div className="w-full ">
      {label && (
        <CustomLabel htmlFor={id} labelSize={labelSize} labelClass={labelClass}>
          {label}
        </CustomLabel>
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
