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
      10: '10px',
      13: '13px',
      24: '24px',
      mini: '$10',
      body: '$13',
      display: '$24',
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      semiBold: 600,
    },
  },
});

export type { VariantProps } from '@stitches/react';
