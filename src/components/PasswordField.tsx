import { useState } from 'react';
import { Input } from './components/ui/input';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { cn } from './lib/utils';

interface PasswordFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

export const PasswordField = ({
  label,
  className,
  children,
  ...props
}: PasswordFieldProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-left h-[20px] font-medium text-[16px] leading-[125%] text-[#242b33] mb-[10px]">
          {label}
        </label>
      )}
      <div className="relative">
        <Input
          type={visible ? 'text' : 'password'}
          className={cn(
            'border border-[#99a2a5] rounded-[8px] px-[28px] py-[14px] h-[48px]',
            className
          )}
          {...props}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center p-[14px] text-gray-500 hover:border-transparent"
          onClick={() => setVisible(!visible)}
          tabIndex={-1}
          aria-label={visible ? 'Сховати пароль' : 'Показати пароль'}
        >
          {visible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>
      {children && (
        <p
          className="flex mt-[10px] text-[12px] text-[#99a2a5] w-[493px] text-start"
          style={{
            fontFamily: 'var(--font-family)',
            fontWeight: 400,
            lineHeight: '150%',
          }}
        >
          {children}
        </p>
      )}
    </div>
  );
};
