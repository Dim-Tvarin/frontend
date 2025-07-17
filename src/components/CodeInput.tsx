import {
  useRef,
  useEffect,
  useCallback,
  type ChangeEvent,
  type KeyboardEvent,
  type ClipboardEvent,
  type FC,
} from 'react';
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

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const notifyChange = useCallback(() => {
    const code = inputsRef.current.map(el => el?.value || '').join('');
    onChange(code);
  }, [onChange]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value.replace(/\D/g, '');
    e.target.value = val;
    if (val && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
    notifyChange();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    switch (e.key) {
      case 'Backspace':
        if (!e.currentTarget.value && idx > 0) {
          inputsRef.current[idx - 1]?.focus();
        }
        break;
      case 'ArrowLeft':
        if (idx >= 0) {
          inputsRef.current[idx - 1]?.focus();
          e.preventDefault();
        }
        break;
      case 'ArrowRight':
        if (idx < length - 1) {
          inputsRef.current[idx + 1]?.focus();
          e.preventDefault();
        }
        break;
      default:
        break;
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').trim();
    if (/^\d+$/.test(pasted)) {
      const digits = pasted.slice(0, length).split('');
      digits.forEach((d, i) => {
        if (inputsRef.current[i]) {
          inputsRef.current[i]!.value = d;
        }
      });
      notifyChange();
      const next = digits.length < length ? digits.length : length - 1;
      inputsRef.current[next]?.focus();
    }
    e.preventDefault();
  };

  return (
    <div className="flex flex-col m-auto">
      <div className={cn('flex gap-10 justify-center', className)}>
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={el => {
              inputsRef.current[i] = el;
            }}
            type="tel"
            inputMode="numeric"
            placeholder="*"
            maxLength={1}
            pattern="\d*"
            aria-label={`Digit ${i + 1}`}
            className={cn(
              'w-[46px] sm:w-50 h-[46px] sm:h-50 text-center text-xl rounded-lg border border-input-border placeholder:text-black transition-all',
              error
                ? 'border-error-input focus:border-2 focus:ring-error-input focus:outline-none'
                : 'border-input-border focus:border-2 focus:ring-default-btn focus:outline-none'
            )}
            onChange={e => handleChange(e, i)}
            onKeyDown={e => handleKeyDown(e, i)}
            onPaste={handlePaste}
          />
        ))}
      </div>
      {error && <FormError error={error} />}
    </div>
  );
};
