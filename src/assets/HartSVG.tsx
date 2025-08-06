import { useSelector } from 'react-redux';
import { selectUserTheme } from 'src/redux/users/usersSlice';
import { cn } from 'components/lib/utils';

export type HartContext = 'header' | 'card';

interface HartSVGProps {
  size?: number;
  hartFill?: boolean;
  context?: HartContext;
  className?: string;
}

const HartSVG: React.FC<HartSVGProps> = ({
  size = 36,
  hartFill,
  context,
  className,
}) => {
  const theme = useSelector(selectUserTheme);

  let rectFill: string;
  if (hartFill) {
    if (context === 'card') {
      rectFill = theme === 'light' ? 'var(--color-default-btn)' : 'white';
    } else rectFill = 'transparent';
  } else {
    if (context === 'card') {
      rectFill =
        theme === 'light' ? 'var(--color-default-btn)' : 'var(--color-orange)';
    } else {
      rectFill = 'transparent';
    }
  }

  let strokeColor: string;
  if (hartFill) {
    strokeColor = 'var(--color-error-input)';
  } else if (context === 'header') {
    strokeColor = theme === 'light' ? 'black' : 'var(--color-default-btn)';
  } else {
    strokeColor = theme === 'light' ? 'white' : 'black';
  }

  const pathFill = hartFill ? 'var(--color-error-input)' : 'none';

  const viewBox = context === 'header' ? '6 6 24 24' : '0 0 36 36';

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      className={cn(className)}
    >
      <rect width={size} height={size} rx="50" fill={rectFill} />
      <path
        d="M18.62 26.8101C18.28 26.9301 17.72 26.9301 17.38 26.8101C14.48 25.8201 8 21.6901 8 14.6901C8 11.6001 10.49 9.1001 13.56 9.1001C15.38 9.1001 16.99 9.9801 18 11.3401C19.01 9.9801 20.63 9.1001 22.44 9.1001C25.51 9.1001 28 11.6001 28 14.6901C28 21.6901 21.52 25.8201 18.62 26.8101Z"
        stroke={strokeColor}
        fill={pathFill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HartSVG;
