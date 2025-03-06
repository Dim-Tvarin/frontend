import { useState, type FC } from 'react';
import { Input } from './components/ui/input';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';
import { cn } from './lib/utils';

interface PasswordFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  error?: string;
  children?: React.ReactNode;
}

export const PasswordField: FC<PasswordFieldProps> = ({
  label,
  id,
  error,
  className,
  children,
  ...rest
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={id}
          className="block font-medium text-left h-[20px] text-[16px] leading-[125%] text-input-label mb-[10px]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <Input
          type={visible ? 'text' : 'password'}
          id={id}
          className={cn(
            'border border-[#99a2a5] rounded-[8px] px-[28px] py-[14px] h-[48px] placeholder:text-input-border',
            className
          )}
          {...rest}
        />

        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center p-[14px] text-gray-500 hover:border-transparent focus:outline-0 focus-visible:outline-0"
          onClick={() => setVisible(!visible)}
          tabIndex={-1}
          aria-label={visible ? 'Сховати пароль' : 'Показати пароль'}
        >
          {visible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>
      {error && (
        <div className="flex items-center mt-[10px] gap-[4px]">
          <MdErrorOutline size={18} className="text-error" />
          <p className="text-left text-error text-xs">{error}</p>
        </div>
      )}
      {children && (
        <p
          className="flex mt-[10px] text-[12px] text-input-border w-[493px] text-start"
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
