import { createStitches } from '@stitches/react';
import { baseColors } from './baseColors';

export const { getCssText, styled, theme } = createStitches({
  theme: {
    colors: {
      scaleBlack: baseColors.scale.black,
      scale800: baseColors.scale[800],
      scale700: baseColors.scale[700],
      scale600: baseColors.scale[600],
      scale500: baseColors.scale[500],
      scale400: baseColors.scale[400],
      scale300: baseColors.scale[300],
      scale200: baseColors.scale[200],
      scale100: baseColors.scale[100],
      scaleWhite: baseColors.scale.white,
      accentError: baseColors.accent.error,
      accentSuccess: baseColors.accent.success,
      accentWarning: baseColors.accent.warning,
      accentInfo: baseColors.accent.info,
      accentField: baseColors.accent.field,
      accentArgument: baseColors.accent.argument,
    },
    fonts: {
      stack:
        'Inter, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
    },
    fontSizes: {
      1: '12px',
      2: '15px',
      3: '22px',
      4: '29px',
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      semiBold: 600,
    },
    space: {
      1: '2px',
      2: '4px',
      3: '8px',
      4: '16px',
    },
  },
});

export type { VariantProps } from '@stitches/react';
