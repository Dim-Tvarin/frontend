import type { FC } from 'react';
import { Input } from './components/ui/input';
import { cn } from './lib/utils';
import { CustomLabel } from './CustomLabel';
import FormError from './FormError';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  error?: string;
  labelSize?: string;
  labelClass?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export const InputField: FC<InputFieldProps> = ({
  id,
  label,
  className,
  labelClass,
  labelSize = 'xs',
  error,
  ref,
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
        ref={ref}
        className={cn(
          'border border-input-border rounded-[8px] px-[20px] py-[14px] h-[48px] placeholder:text-input-border focus-visible:border-0',
          { 'border-error-input': error },
          className
        )}
        {...rest}
      />
      {error && <FormError error={error} />}
    </div>
  );
};
