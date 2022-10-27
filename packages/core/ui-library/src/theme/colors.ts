import { HexValue } from '../hooks/useTheme/types';
import { hexToHSL } from './hexToHSL';

type Colors = {
  surface1: HexValue;
  surface2: HexValue;
  surface3: HexValue;
  text1: HexValue;
  text2: HexValue;
  text3: HexValue;
  text4: HexValue;
  violet: HexValue;
  pink: HexValue;
  blue: HexValue;
  green: HexValue;
  orange: HexValue;
  yellow: HexValue;
  red: HexValue;
};

const generateColors = ({ colors }: { colors: Colors }) => ({
  surface1: hexToHSL({ hex: colors.surface1 }),
  surface2: hexToHSL({ hex: colors.surface2 }),
  surface3: hexToHSL({ hex: colors.surface3 }),
  text1: hexToHSL({ hex: colors.text1 }),
  text2: hexToHSL({ hex: colors.text2 }),
  text3: hexToHSL({ hex: colors.text3 }),
  text4: hexToHSL({ hex: colors.text4 }),
  violet_default: hexToHSL({ hex: colors.violet, alpha: 1 }),
  violet_light: hexToHSL({ hex: colors.violet, alpha: 0.6 }),
  violet_lightest: hexToHSL({ hex: colors.violet, alpha: 0.1 }),
  pink_default: hexToHSL({ hex: colors.pink, alpha: 1 }),
  pink_light: hexToHSL({ hex: colors.pink, alpha: 0.6 }),
  pink_lightest: hexToHSL({ hex: colors.pink, alpha: 0.1 }),
  blue_default: hexToHSL({ hex: colors.blue, alpha: 1 }),
  blue_light: hexToHSL({ hex: colors.blue, alpha: 0.6 }),
  blue_lightest: hexToHSL({ hex: colors.blue, alpha: 0.1 }),
  green_default: hexToHSL({ hex: colors.green, alpha: 1 }),
  green_light: hexToHSL({ hex: colors.green, alpha: 0.6 }),
  green_lightest: hexToHSL({ hex: colors.green, alpha: 0.1 }),
  orange_default: hexToHSL({ hex: colors.orange, alpha: 1 }),
  orange_light: hexToHSL({ hex: colors.orange, alpha: 0.6 }),
  orange_lightest: hexToHSL({ hex: colors.orange, alpha: 0.1 }),
  yellow_default: hexToHSL({ hex: colors.yellow, alpha: 1 }),
  yellow_light: hexToHSL({ hex: colors.yellow, alpha: 0.6 }),
  yellow_lightest: hexToHSL({ hex: colors.yellow, alpha: 0.1 }),
  red_default: hexToHSL({ hex: colors.red, alpha: 1 }),
  red_light: hexToHSL({ hex: colors.red, alpha: 0.6 }),
  red_lightest: hexToHSL({ hex: colors.red, alpha: 0.1 }),
});

export const lightColors = generateColors({
  colors: {
    surface1: '#FFFFFF',
    surface2: '#FBFBFB',
    surface3: '#E8E8E8',
    text1: '#1B1B1B',
    text2: '#4A4A4A',
    text3: '#757575',
    text4: '#BCBCBC',
    violet: '#5C4CDD',
    pink: '#D60690',
    blue: '#0B6AF9',
    green: '#128934',
    orange: '#AF5F15',
    yellow: '#767800',
    red: '#BF0000',
  },
});

export const darkColors = generateColors({
  colors: {
    surface1: '#16171B',
    surface2: '#1D1D20',
    surface3: '#363739',
    text1: '#FFFFFF',
    text2: '#BFBFBF',
    text3: '#A4A4A4',
    text4: '#55565C',
    violet: '#948AE3',
    pink: '#FC618D',
    blue: '#5AD4E6',
    green: '#7BD88F',
    orange: '#EE8E57',
    yellow: '#FCE566',
    red: '#FC4747',
  },
});
