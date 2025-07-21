import { useState, type FC } from 'react';
import { Input } from './components/ui/input';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { cn } from './lib/utils';
import { CustomLabel } from './CustomLabel';
import FormError from './FormError';

interface PasswordFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClass?: string;
  labelSize?: string;
  id: string;
  error?: string;
  hideToggle?: boolean;
  children?: React.ReactNode;
}

export const PasswordField: FC<PasswordFieldProps> = ({
  label,
  id,
  error,
  className,
  labelClass,
  labelSize = '[16px]',
  hideToggle = false,
  children,
  ...rest
}) => {
  const [visible, setVisible] = useState(hideToggle);
  return (
    <div className="relative w-full">
      {label && (
        <CustomLabel htmlFor={id} labelSize={labelSize} labelClass={labelClass}>
          {label}
        </CustomLabel>
      )}
      <div className="relative">
        <Input
          type={visible && !hideToggle ? 'text' : 'password'}
          id={id}
          className={cn(
            'border border-input-border rounded-[8px] px-[20px] py-[14px] h-[48px] placeholder:text-input-border focus-visible:border-2 focus-visible:ring-0',
            { 'border-error-input': error },
            className
          )}
          {...rest}
        />

        {!hideToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center p-[14px] text-gray-500 hover:border-transparent focus:outline-0 focus-visible:outline-0"
            onClick={() => setVisible(!visible)}
            tabIndex={-1}
            aria-label={visible ? 'Сховати пароль' : 'Показати пароль'}
          >
            {visible ? (
              <FaEyeSlash
                size={24}
                className={cn({ 'text-error-input': error })}
              />
            ) : (
              <FaEye size={24} className={cn({ 'text-error-input': error })} />
            )}
          </button>
        )}
      </div>
      {error && <FormError error={error} />}
      {children && (
        <p className="flex mt-[10px] text-sm text-input-border text-start font-normal leading-[150%]">
          {children}
        </p>
      )}
    </div>
  );
};
