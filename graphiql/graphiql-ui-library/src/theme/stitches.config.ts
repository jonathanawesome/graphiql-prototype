import { createStitches } from '@stitches/react';
import { darkColors, lightColors } from './colors';

const fonts = {
  stack:
    'Inter, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
  mono: '"Fira Code", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace',
  // mono: '"Hack", "Fira Code", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace',
};
const fontSizes = {
  10: '10px',
  13: '13px',
  24: '24px',
  mini: '$10',
  body: '$13',
  display: '$24',
};
const fontWeights = {
  regular: 400,
  medium: 500,
  semiBold: 600,
};
const transitions = {
  authenticMotion: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

const theme = {
  fonts: {
    ...fonts,
  },
  fontSizes: {
    ...fontSizes,
  },
  fontWeights: {
    ...fontWeights,
  },
  transitions: {
    ...transitions,
  },
};

export const { createTheme, globalCss, keyframes, styled } = createStitches({
  theme: {
    ...theme,
    colors: {
      ...lightColors,
    },
  },
});

// export const lightTheme = createTheme('lightTheme', {
//   colors: {
//     ...lightColors,
//   },
// });

export const darkTheme = createTheme('darktheme', {
  colors: {
    ...lightColors,
    ...darkColors,
  },
});
