import type { FC, LabelHTMLAttributes } from 'react';
import { cn } from './lib/utils';

interface CustomLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  labelSize?: string;
  labelClass?: string;
  htmlFor?: string;
}

export const CustomLabel: FC<CustomLabelProps> = ({
  htmlFor,
  labelSize = 'xs',
  labelClass,
  children,
  ...rest
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'block text-left font-medium leading-[150%] text-input-label mb-10',
        `text-${labelSize}`,
        labelClass
      )}
      {...rest}
    >
      {children}
    </label>
  );
};
