import { Button } from './components/ui/button';
import { cn } from './lib/utils';
import { Spinner } from './Spinner';

interface CustomButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  as?: React.ElementType;
  type?: 'button' | 'submit' | 'reset';
  styleType?:
    | 'defaultButton'
    | 'redButton'
    | 'orangeButton'
    | 'linkButton'
    | 'whiteButton'
    | 'iconButton';
}
export const CustomButton = ({
  children,
  styleType,
  className,
  loading,
  as,
  ...props
}: CustomButtonProps) => {
  return (
    <Button
      className={cn(
        'w-full text-white outline-none shadow-none',
        styleType === 'defaultButton' &&
          'rounded-[20px] px-6 py-2.5 w-[236px] h-[44px] mt-[54px] mx-auto bg-default-btn hover:bg-orange hover:border-default-btn hover:border-2 hover:text-default-btn disabled:bg-disabled',
        styleType === 'redButton' &&
          'rounded-[20px] px-6 py-2.5 w-[236px] h-[44px] mt-[54px] mx-auto bg-red-btn hover:bg-red-btn-hov disabled:bg-disabled',
        styleType === 'orangeButton' &&
          'rounded-[20px] px-10 py-24 w-[230px] h-[45px] mt-[54px] mx-auto bg-btn-orange hover:bg-orange disabled:bg-disabled',
        styleType === 'linkButton' &&
          'text-default-btn hover:text-orange disabled:text-disabled bg-none p-0',
        styleType === 'whiteButton' &&
          'rounded-[20px] px-6 py-2.5 w-[236px] h-[44px] mx-auto border-2 text-default-btn bg-white border-default-btn hover:border-orange disabled:bg-disabled',
        styleType === 'iconButton' &&
          'w-9 h-9 bg-default-btn rounded-full hover:bg-link flex items-center justify-center hover:border-orange disabled:bg-disabled',
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </Button>
  );
};
