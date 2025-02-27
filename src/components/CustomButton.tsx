import { Button } from './components/ui/button';
import { cn } from './lib/utils';

interface CustomButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  className?: string;
}

export const CustomButton = ({
  children,
  className,
  ...props
}: CustomButtonProps) => (
  <Button
    className={cn('w-full text-white bg-black hover:bg-gray-900', className)}
    {...props}
  >
    {children}
  </Button>
);
