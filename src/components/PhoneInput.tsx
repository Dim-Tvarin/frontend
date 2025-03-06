import type { FC } from 'react';
import { InputField } from './InputField';
import { cn } from './lib/utils';
import { MdErrorOutline } from 'react-icons/md';

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  error?: string;
}

export const PhoneInput: FC<PhoneInputProps> = ({
  label,
  id,
  error,
  className,
  ...rest
}) => (
  <>
    <InputField
      label={label}
      id={id}
      className={cn('pl-12', className)}
      {...rest}
    />
    {error && (
      <div className="flex items-center mt-[10px] gap-[4px]">
        <MdErrorOutline size={18} className="text-error" />
        <p className="text-left text-error text-xs">{error}</p>
      </div>
    )}
  </>
);
