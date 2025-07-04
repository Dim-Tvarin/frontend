import type { ReactElement } from 'react';

const CabinetSVG = ({
  color,
  size,
}: {
  color?: string;
  size?: string;
}): ReactElement => {
  return (
    <svg width={size ? size : '32'} height={size ? size : '32'} fill="none">
      <path
        d="M23 25V23C23 21.9391 22.5786 20.9217 21.8284 20.1716C21.0783 19.4214 20.0609 19 19 19H13C11.9391 19 10.9217 19.4214 10.1716 20.1716C9.42143 20.9217 9 21.9391 9 23V25"
        stroke={color ? color : 'white'}
        className={`
        stroke-[${color ? color : 'white'}]
        dark:stroke-black
      `}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 15C18.2091 15 20 13.2091 20 11C20 8.79086 18.2091 7 16 7C13.7909 7 12 8.79086 12 11C12 13.2091 13.7909 15 16 15Z"
        className={`
        stroke-[${color ? color : 'white'}]
        dark:stroke-black
      `}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default CabinetSVG;
