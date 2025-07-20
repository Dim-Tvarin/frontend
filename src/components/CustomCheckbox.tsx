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
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
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
  checked,
  onCheckedChange,
  children,
  ...rest
}) => {
  return (
    <div>
      {label && (
        <CustomLabel htmlFor={id} labelSize={labelSize} labelClass={labelClass}>
          {label}
        </CustomLabel>
      )}
      <div className="flex align-center gap-10 ">
        <div className="flex w-[24px] h-[27px] items-center justify-center  outline-none">
          <Checkbox
            id={id}
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            className={cn(
              'w-16 h-[18px] border-2 border-default-btn hover:border-orange ',
              { 'border-error-input': error },
              className
            )}
            {...rest}
          />
        </div>
        {children && (
          <span className="text-sm text-light-gray">{children}</span>
        )}
      </div>
      {error && <FormError error={error} />}
    </div>
  );
};

export default CustomCheckbox;
