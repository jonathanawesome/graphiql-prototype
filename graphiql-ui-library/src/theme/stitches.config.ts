import { createStitches } from '@stitches/react';
import { colors } from './colors';

export const { globalCss, keyframes, styled, theme } = createStitches({
  theme: {
    colors: {
      // gray
      gray007: colors.base.gray.gray007,
      gray010: colors.base.gray.gray010,
      gray015: colors.base.gray.gray015,
      gray040: colors.base.gray.gray040,
      gray060: colors.base.gray.gray060,
      gray100: colors.base.gray.gray100,
      // primary
      primary010: colors.base.primary.primary010,
      primary060: colors.base.primary.primary060,
      primary080: colors.base.primary.primary080,
      primary100: colors.base.primary.primary100,
      // secondary
      secondary010: colors.base.secondary.secondary010,
      secondary060: colors.base.secondary.secondary060,
      secondary080: colors.base.secondary.secondary080,
      secondary100: colors.base.secondary.secondary100,
      // error
      error010: colors.accent.error.error010,
      error060: colors.accent.error.error060,
      error100: colors.accent.error.error100,
      // warning
      warning010: colors.accent.warning.warning010,
      warning060: colors.accent.warning.warning060,
      warning100: colors.accent.warning.warning100,
      // success
      success010: colors.accent.success.success010,
      success060: colors.accent.success.success060,
      success100: colors.accent.success.success100,
      // info
      info010: colors.accent.info.info010,
      info060: colors.accent.info.info060,
      info100: colors.accent.info.info100,
      // other
      appBackground: colors.other.appBackground,
      editorBackground: colors.other.editorBackground,
      // pure
      black: colors.pure.black,
      white: colors.pure.white,
    },
    fonts: {
      stack:
        'Inter, -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
      mono: '"Hack", "Fira Code", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace',
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
    transitions: {
      authenticMotion: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
});
