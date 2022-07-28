// import { HexValue } from '../hooks/useTheme/types';

import { HexValue } from '../hooks/useTheme/types';

export const hexToRGB = ({ hex, alpha }: { hex: HexValue; alpha: number }) => {
  const r = '0x' + h[1] + h[2];
  const g = '0x' + h[3] + h[4];
  const b = '0x' + h[5] + h[6];

  return 'rgb(' + +r + ',' + +g + ',' + +b + ')';
};
