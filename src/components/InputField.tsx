import { Input } from './components/ui/input';
import { cn } from './lib/utils';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export const InputField = ({ label, className, ...props }: InputFieldProps) => (
  <div className="w-full ">
    {label && (
      <label className="block text-left h-[20px] font-medium text-[16px] text-[#242b33] mb-[10px]">
        {label}
      </label>
    )}
    <Input
      className={cn(
        'border border-[#99a2a5] rounded-[8px] px-[28px] py-[14px] h-[48px] placeholder:text-[#99a2a5]',
        className
      )}
      {...props}
    />
  </div>
);
