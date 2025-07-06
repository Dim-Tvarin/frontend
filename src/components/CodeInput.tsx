import { useRef } from 'react';
import type { FC } from 'react';
import { cn } from './lib/utils';
import FormError from './FormError';

interface CodeInputProps {
  length?: number;
  onChange: (code: string) => void;
  error?: string;
  className?: string;
}

export const CodeInput: FC<CodeInputProps> = ({
  length = 6,
  onChange,
  error,
  className,
}) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const value = e.target.value;

    if (value && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }

    const code = inputsRef.current.map(input => input?.value || '').join('');
    onChange(code);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === 'Backspace' && !inputsRef.current[idx]?.value && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      pastedData.split('').forEach((digit, idx) => {
        inputsRef.current[idx]?.setAttribute('value', digit);
        onChange(inputsRef.current.map(input => input?.value || '').join(''));
      });
    }
  };

  return (
    <div className="flex flex-col m-auto">
      <div className={cn('flex flex-row gap-10', className)}>
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            id={`code-${i}`}
            ref={el => {
              inputsRef.current[i] = el;
            }}
            type="password"
            inputMode="numeric"
            placeholder="*"
            maxLength={1}
            className={cn(
              'w-[46px] sm:w-50 h-[46px] sm:h-50 text-center text-xl border border-input-border rounded-[8px] placeholder:text-input-border transition-all',
              error ? 'border-error-input' : 'border-input-border',
              'focus:ring-2 focus:ring-black'
            )}
            onChange={e => handleChange(e, i)}
            onKeyDown={e => handleKeyDown(e, i)}
            onPaste={e => handlePaste(e)}
            autoComplete="new-password"
          />
        ))}
      </div>
      {error && <FormError error={error} />}
    </div>
  );
};
