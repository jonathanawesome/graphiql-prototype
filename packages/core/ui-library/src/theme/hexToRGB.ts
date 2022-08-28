// import { HexValue } from '../hooks/useTheme/types';

import { HexValue } from '../hooks/useTheme/types';

export const hexToRGB = ({ hex, alpha }: { hex: HexValue; alpha: number }) => {
  const r = '0x' + hex[1] + hex[2];
  const g = '0x' + hex[3] + hex[4];
  const b = '0x' + hex[5] + hex[6];

  return 'rgba(' + +r + ',' + +g + ',' + +b + ',' + +alpha + ')';
};
