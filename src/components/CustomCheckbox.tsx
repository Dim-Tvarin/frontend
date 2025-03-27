import type { FC } from 'react';
import { Checkbox } from './components/ui/checkbox';
import { cn } from './lib/utils';
import { CustomLabel } from './CustomLabel';

interface CheckboxProps {
  label?: string;
  id: string;
  disabled?: boolean;
  className?: string;
  labelSize?: string;
  labelClass?: string;
}

const CustomCheckbox: FC<CheckboxProps> = ({
  label,
  id,
  disabled,
  className,
  labelClass = 'ml-8',
  labelSize,
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
        className={cn('w-24 h-24 rounded-full', className)}
      />
    </div>
  );
};

export default CustomCheckbox;
