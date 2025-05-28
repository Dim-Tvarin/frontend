export const Spinner = ({ size = '30' }: { size?: string }) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width={size}
        height={size}
        style={{
          shapeRendering: 'auto',
          display: 'block',
          background: 'transparent',
        }}
      >
        <g>
          <circle
            strokeDasharray="117.80972450961724 41.269908169872416"
            r="25"
            strokeWidth="6"
            stroke="#ff8c42"
            fill="none"
            cy="50"
            cx="50"
          >
            <animateTransform
              keyTimes="0;1"
              values="0 50 50;360 50 50"
              dur="1s"
              repeatCount="indefinite"
              type="rotate"
              attributeName="transform"
            ></animateTransform>
          </circle>
          <g></g>
        </g>
      </svg>
    </div>
  );
};
