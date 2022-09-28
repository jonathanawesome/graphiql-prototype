import { createStitches } from '@stitches/react';
import { darkColors, lightColors } from './colors';
import { utils } from './utils';

const fonts = {
  stack:
    'Inter, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
  mono: '"Hack", "Fira Code", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace',
};
const fontSizes = {
  14: '14px',
  body: '$14',
};
const fontWeights = {
  regular: 400,
  medium: 500,
  semiBold: 600,
};
const space = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
};
const transitions = {
  authenticMotion: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

const baseTheme = {
  fonts: {
    ...fonts,
  },
  fontSizes: {
    ...fontSizes,
  },
  fontWeights: {
    ...fontWeights,
  },
  space: {
    ...space,
  },
  transitions: {
    ...transitions,
  },
};

export const { createTheme, globalCss, keyframes, styled, theme } = createStitches({
  theme: {
    ...baseTheme,
    colors: {
      ...lightColors,
    },
  },
  utils,
});

export const darkTheme = createTheme({
  ...baseTheme,
  colors: {
    ...darkColors,
  },
});
