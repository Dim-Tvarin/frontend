import type { FC } from 'react';
import { InputField } from './InputField';
import { cn } from './lib/utils';
import { CustomLabel } from './CustomLabel';
import FormError from './FormError';

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClass?: string;
  labelSize?: string;
  id: string;
  error?: string;
}

export const PhoneInput: FC<PhoneInputProps> = ({
  label,
  labelClass,
  labelSize,
  id,
  error,
  className,
  ...rest
}) => (
  <div className="w-full">
    {label && (
      <CustomLabel htmlFor={id} labelSize={labelSize} labelClass={labelClass}>
        {label}
      </CustomLabel>
    )}
    <InputField
      id={id}
      className={cn(
        'pl-12',
        { 'border-error-input text-error-input': error },
        className
      )}
      {...rest}
    />
    {error && <FormError error={error} />}
  </div>
);
