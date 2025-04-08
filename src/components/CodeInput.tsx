import type { FC } from 'react';
import { cn } from './lib/utils';
import { CustomLabel } from './CustomLabel';
import FormError from './FormError';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from './components/ui/input-otp';

interface CodeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  error?: string;
  labelSize?: string;
  labelClass?: string;
  length?: number;
  value?: string; // Expecting value as string for controlled form
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // onChange for updating input
}

export const CodeInput: FC<CodeInputProps> = ({
  id,
  label,
  className,
  labelClass,
  labelSize = 'xs',
  error,
  length = 6,
  value = '',
  onChange,
}) => {
  return (
    <div className="w-full">
      {label && (
        <CustomLabel htmlFor={id} labelSize={labelSize} labelClass={labelClass}>
          {label}
        </CustomLabel>
      )}

      <InputOTP maxLength={length}>
        <InputOTPGroup className="flex gap-10">
          {[...Array(length)].map((_, i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className={cn(
                'border border-input-border rounded-[8px] w-50 h-50 placeholder:text-input-border',
                { 'border-error-input': error },
                className
              )}
            >
              {/* Show the corresponding digit from value */}
              <input
                type="text"
                maxLength={1}
                value={value[i] || ''}
                onChange={onChange}
                className="w-full h-full text-center text-lg"
                aria-label={`OTP Slot ${i + 1}`}
              />
            </InputOTPSlot>
          ))}
        </InputOTPGroup>
      </InputOTP>

      {error && <FormError error={error} />}
    </div>
  );
};
