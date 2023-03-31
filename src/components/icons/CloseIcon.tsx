import React, { FC } from 'react';

interface Props {
  size: string;
  fill: string;
}

const CloseIcon: FC<Props> = ({ size, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0,0,256,256"
      width={size}
      height={size}
      fill-rule="nonzero"
    >
      <g transform="">
        <g
          fill={fill}
          fill-rule="nonzero"
          stroke-width="1"
          stroke-linecap="butt"
          stroke-linejoin="miter"
          stroke-miterlimit="10"
        >
          <g transform="scale(5.12,5.12)">
            <path d="M9.15625,6.3125l-2.84375,2.84375l15.84375,15.84375l-15.9375,15.96875l2.8125,2.8125l15.96875,-15.9375l15.9375,15.9375l2.84375,-2.84375l-15.9375,-15.9375l15.84375,-15.84375l-2.84375,-2.84375l-15.84375,15.84375z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default CloseIcon;
