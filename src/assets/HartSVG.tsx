const HartSVG = ({
  fill = '#042D4A',
  stroke,
  size = '36',
  hartFill,
  className = '',
}: {
  fill?: string;
  stroke?: string;
  size?: string;
  className?: string;
  hartFill?: boolean;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      className={className}
    >
      <rect
        width={size}
        height={size}
        rx="18"
        className={`
        fill-[${fill}]
        dark:fill-orange
      `}
      />
      <path
        d="M18.62 26.8101C18.28 26.9301 17.72 26.9301 17.38 26.8101C14.48 25.8201 8 21.6901 8 14.6901C8 11.6001 10.49 9.1001 13.56 9.1001C15.38 9.1001 16.99 9.9801 18 11.3401C19.01 9.9801 20.63 9.1001 22.44 9.1001C25.51 9.1001 28 11.6001 28 14.6901C28 21.6901 21.52 25.8201 18.62 26.8101Z"
        className={`dark:stroke-header`}
        stroke={hartFill ? '#EB5050' : stroke}
        fill={hartFill ? '#EB5050 ' : 'none'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default HartSVG;
