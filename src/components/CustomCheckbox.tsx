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
  children?: React.ReactNode;
}

const CustomCheckbox: FC<CheckboxProps> = ({
  label,
  id,
  disabled,
  className,
  labelClass = 'ml-8',
  labelSize,
  error,
  children,
  ...rest
}) => {
  return (
    <div>
      {' '}
      {label && (
        <CustomLabel htmlFor={id} labelSize={labelSize} labelClass={labelClass}>
          {label}
        </CustomLabel>
      )}
      <div className="flex items-center gap-10">
        <div className="flex w-[24px] h-[27px] outline-none">
          <Checkbox
            id={id}
            disabled={disabled}
            className={cn(
              'w-16 h-18',
              { 'border-error-input': error },
              className
            )}
            {...rest}
          />
        </div>
        {children && <div className="text-sm text-default-btn">{children}</div>}
      </div>
      {error && <FormError error={error} />}
    </div>
  );
};

export default CustomCheckbox;
