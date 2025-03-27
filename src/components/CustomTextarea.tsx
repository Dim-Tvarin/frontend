import { MdErrorOutline } from 'react-icons/md';
import { Textarea } from './components/ui/textarea';
import { cn } from './lib/utils';
import { CustomLabel } from './CustomLabel';

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
        className="mt-16 min-h-[80px] px-[21px] py-[14px] rounded-[10px] border-input-border outline-0"
        {...rest}
      />

      {error && (
        <div className="flex items-center mt-[10px] gap-[4px]">
          <MdErrorOutline size={18} className="text-error" />
          <p className="text-left text-error text-xs">{error}</p>
        </div>
      )}
    </div>
  );
};
