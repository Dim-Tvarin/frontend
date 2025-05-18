import type { ReactElement } from 'react';

const CloseSVG = ({
  color,
  size,
}: {
  color?: string;
  size?: string;
}): ReactElement => {
  return (
    <div className="w-32 h-32 flex items-center justify-center">
      <svg
        width={size || '24'}
        height={size || '24'}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 22.1477C17.5228 22.1477 22 17.6405 22 12.0805C22 6.52063 17.5228 2.01343 12 2.01343C6.47715 2.01343 2 6.52063 2 12.0805C2 17.6405 6.47715 22.1477 12 22.1477Z"
          stroke={color || '#99A2A5'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.17163 9.23312L14.8285 14.9279"
          stroke={color || '#99A2A5'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.17163 14.9279L14.8285 9.23313"
          stroke={color || '#99A2A5'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default CloseSVG;
