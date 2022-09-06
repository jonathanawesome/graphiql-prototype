import { hexToHSL } from './hexToHSL';

export const editorColors = {
  gray010: '#EBEDF0',
  gray040: '#B1B7C3',
  gray060: '#8993A4',
  primary100: '#D60690',
  secondary100: '#6E6ACF',
  error100: '#F85B30',
  warning100: '#D37F00',
  success100: '#2BAB7C',
  info100: '#007EEA',
  red: 'red',
};

export const lightColors = {
  surface1: hexToHSL({ hex: '#FFFFFF' }),
  surface2: hexToHSL({ hex: '#FBFBFB' }),
  surface3: hexToHSL({ hex: '#EAEAEA' }),
  text1: hexToHSL({ hex: '#1B1B1B' }),
  text2: hexToHSL({ hex: '#606060' }),
  text3: hexToHSL({ hex: '#757575' }),
  text4: hexToHSL({ hex: '#BCBCBC' }),
  violet_default: hexToHSL({ hex: '#4640DC' }),
  pink_default: hexToHSL({ hex: '#D60690' }),
};

export const darkColors = {
  surface1: hexToHSL({ hex: '#16171B' }),
  surface2: hexToHSL({ hex: '#222226' }),
  surface3: hexToHSL({ hex: '#363739' }),
  text1: hexToHSL({ hex: '#FFFFFF' }),
  text2: hexToHSL({ hex: '#BFBFBF' }),
  text3: hexToHSL({ hex: '#A4A4A4' }),
  text4: hexToHSL({ hex: '#55565C' }),
  violet_default: hexToHSL({ hex: '#948AE3' }),
  pink_default: hexToHSL({ hex: '#FC618D' }),
};
