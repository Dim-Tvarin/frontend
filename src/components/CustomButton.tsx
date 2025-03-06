import { Button } from './components/ui/button';
import { cn } from './lib/utils';

interface CustomButtonProps extends React.ComponentProps<typeof Button> {
    children: React.ReactNode;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    styleType?: 'defaultButton' | 'redButton';
}
// Этот файл лишний, его надо удалить
export const CustomButton = ({
    children,
    styleType,
    className,
    ...props
}: CustomButtonProps) => (
    <Button
        className={cn(
            'w-full text-white bg-black hover:bg-default-btn-hov',
            styleType === 'defaultButton' &&
                'rounded-[20px] px-6 py-2.5 w-[236px] h-[44px] mt-[54px] mx-auto bg-default-btn hover:bg-default-btn-hov disabled:bg-disabled',
            styleType === 'redButton' &&
                'rounded-[20px] px-6 py-2.5 w-[236px] h-[44px] mt-[54px] mx-auto bg-red-btn hover:bg-red-btn-hov disabled:bg-disabled',
            className
        )}
        {...props}
    >
        {children}
    </Button>
);
