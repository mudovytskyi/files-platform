import React, { forwardRef } from 'react';
import { defaultIconProps, IconProps } from './common/types';

export const UploadIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ size = defaultIconProps.size, ...props }, ref) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
);

UploadIcon.displayName = 'UploadIcon';
