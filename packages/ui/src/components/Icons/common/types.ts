import type { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const defaultIconProps = {
  size: 24,
};
