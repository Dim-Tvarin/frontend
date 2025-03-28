import type { FC } from 'react';
import { Checkbox } from './components/ui/checkbox';
import { cn } from './lib/utils';
import { CustomLabel } from './CustomLabel';
import FormError from './FormError';

interface CheckboxProps {
  label?: string;
  id: string;
  disabled?: boolean;
  className?: string;
  labelSize?: string;
  labelClass?: string;
  error?: string;
}

const CustomCheckbox: FC<CheckboxProps> = ({
  label,
  id,
  disabled,
  className,
  labelClass = 'ml-8',
  labelSize,
  error,
}) => {
  return (
    <div>
      {' '}
      {label && (
        <CustomLabel htmlFor={id} labelSize={labelSize} labelClass={labelClass}>
          {label}
        </CustomLabel>
      )}
      <Checkbox
        id={id}
        disabled={disabled}
        className={cn(
          'w-24 h-24 rounded-full',
          { 'border-error-input text-error-input': error },
          className
        )}
      />
      {error && <FormError error={error} />}
    </div>
  );
};

export default CustomCheckbox;
