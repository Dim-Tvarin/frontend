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
}

export const CodeInput: FC<CodeInputProps> = ({
  id,
  label,
  className,
  labelClass,
  labelSize = 'xs',
  error,
  length = 6,
}) => {
  return (
    <div className="w-full">
      {label && (
        <CustomLabel htmlFor={id} labelSize={labelSize} labelClass={labelClass}>
          {label}
        </CustomLabel>
      )}

      <InputOTP maxLength={length} type="password">
        <InputOTPGroup className="flex gap-10">
          {[...Array(length)].map((_, i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className={cn(
                'border border-input-border rounded-[8px] w-50 h-50 placeholder:text-input-border otp-hidden',
                { 'border-error-input': error },
                className
              )}
            ></InputOTPSlot>
          ))}
        </InputOTPGroup>
      </InputOTP>

      {error && <FormError error={error} />}
    </div>
  );
};
