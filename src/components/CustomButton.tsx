import { Button } from './components/ui/button';
import { cn } from './lib/utils';
import { Spinner } from './Spinner';

interface CustomButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  styleType?: 'defaultButton' | 'redButton' | 'orangeButton' | 'linkButton';
}
export const CustomButton = ({
  children,
  styleType,
  className,
  loading,
  ...props
}: CustomButtonProps) => {
  return (
    <Button
      className={cn(
        'w-full text-white outline-none shadow-none',
        styleType === 'defaultButton' &&
          'rounded-[20px] px-6 py-2.5 w-[236px] h-[44px] mt-[54px] mx-auto bg-default-btn hover:bg-default-btn-hov disabled:bg-disabled',
        styleType === 'redButton' &&
          'rounded-[20px] px-6 py-2.5 w-[236px] h-[44px] mt-[54px] mx-auto bg-red-btn hover:bg-red-btn-hov disabled:bg-disabled',
        styleType === 'orangeButton' &&
          'rounded-[20px] px-10 py-24 w-[230px] h-[45px] mt-[54px] mx-auto bg-btn-orange hover:bg-orange disabled:bg-disabled',
        styleType === 'linkButton' &&
          'text-xs text-link hover:text-link-hov disabled:text-disabled bg-none',
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </Button>
  );
};
