import { InputField } from './InputField';
import { cn } from './lib/utils';

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export const PhoneInput = ({ label, className, ...props }: PhoneInputProps) => (
  <InputField label={label} className={cn('pl-12', className)} {...props} />
);
