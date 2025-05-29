import { Textarea } from './components/ui/textarea';
import { cn } from './lib/utils';
import { CustomLabel } from './CustomLabel';
import FormError from './FormError';
import type { TextareaHTMLAttributes } from 'react';

interface TextareaDemoProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  placeholder: string;
  label?: string;
  labelSize?: string;
  labelClass?: string;
  className?: string;
  error?: string;
}

export const TextareaDemo = ({
  placeholder,
  label,
  labelClass,
  labelSize = 'base',
  id,
  className,
  error,
  ...rest
}: TextareaDemoProps) => {
  return (
    <div className={cn('w-full', className && className)}>
      {label && (
        <CustomLabel htmlFor={id} labelSize={labelSize} labelClass={labelClass}>
          {label}
        </CustomLabel>
      )}
      <Textarea
        placeholder={placeholder}
        id={id}
        className={cn(
          'mt-16 min-h-[80px] px-[21px] py-[14px] rounded-[10px] border-input-border outline-0',
          'wrap-break-word',
          { 'border-error-input text-error-input': error }
        )}
        {...rest}
      />

      {error && <FormError error={error} />}
    </div>
  );
};
