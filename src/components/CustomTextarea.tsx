import { Textarea } from './components/ui/textarea';
import { cn } from './lib/utils';
import { CustomLabel } from './CustomLabel';
import FormError from './FormError';

export const TextareaDemo = ({
  placeholder,
  label,
  labelClass,
  labelSize = 'xl',
  id,
  className,
  error,
  ...rest
}: {
  id: string;
  placeholder: string;
  label?: string;
  labelSize?: string;
  labelClass?: string;
  className?: string;
  error?: string;
}) => {
  return (
    <div className={cn(className && className, 'w-full')}>
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
          { 'border-error-input text-error-input': error }
        )}
        {...rest}
      />

      {error && <FormError error={error} />}
    </div>
  );
};
