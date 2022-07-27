export const colors = {
  editorHex: {
    gray010: '#EBEDF0',
    gray040: '#B1B7C3',
    gray060: '#8993A4',
    primary100: '#D60690',
    secondary100: '#6E6ACF',
    error100: '#F85B30',
    warning100: '#D37F00',
    success100: '#2BAB7C',
    info100: '#007EEA',
  },
  base: {
    gray: {
      // gray007: 'hsla(219, 28%, 32%, 0.07)',
      // gray010: 'hsla(219, 28%, 32%, 0.10)',
      // gray015: 'hsla(219, 28%, 32%, 0.15)',
      // gray040: 'hsla(219, 28%, 32%, 0.40)',
      // gray060: 'hsla(219, 28%, 32%, 0.60)',
      // gray100: 'hsla(219, 28%, 32%, 1)',
      gray007: '#F1F3F5',
      gray010: '#EBEDF0',
      gray015: '#E2E4E9',
      gray040: '#B1B7C3',
      gray060: '#8994A6',
      gray100: '#3B4C6A',
    },
    primary: {
      // primary010: 'hsla(320, 95%, 43%, 0.10)',
      // primary060: 'hsla(320, 95%, 43%, 0.60)',
      // primary080: 'hsla(320, 95%, 43%, 0.80)',
      // primary100: 'hsla(320, 95%, 43%, 1)',
      primary010: '#FBE6F4',
      primary060: '#E66ABC',
      primary080: '#DE38A6',
      primary100: '#D60690',
    },
    secondary: {
      // secondary010: 'hsla(242, 51%, 61%, 0.10)',
      // secondary060: 'hsla(242, 51%, 61%, 0.60)',
      // secondary080: 'hsla(242, 51%, 61%, 0.80)',
      // secondary100: 'hsla(242, 51%, 61%, 1)',
      secondary010: '#F0F0FA',
      secondary060: '#A8A6E2',
      secondary080: '#8B88D9',
      secondary100: '#6E6ACF',
    },
  },
  other: {
    // appBackground: 'hsla(210, 40%, 98%, 1)',
    // editorBackground: 'hsla(214, 20%, 93%, 1)',
    appBackground: '#F8FAFC',
    editorBackground: '#F1F3F5',
  },
  pure: {
    // white: 'hsla(0, 0%, 100%, 1)',
    // black: 'hsla(0, 0%, 0%, 1)',
    white: '#FFFFFF',
    black: '#000000',
  },
  accent: {
    error: {
      // error010: 'hsla(13, 93%, 58%, 0.10)',
      // error060: 'hsla(13, 93%, 58%, 0.60)',
      // error100: 'hsla(13, 93%, 58%, 1)',
      error010: '#FEEFEA',
      error060: '#FB9D83',
      error100: '#F85B30',
    },
    warning: {
      // warning010: 'hsla(36, 100%, 41%, 0.10)',
      // warning060: 'hsla(36, 100%, 41%, 0.60)',
      // warning100: 'hsla(36, 100%, 41%, 1)',
      warning010: '#FBF2E5',
      warning060: '#E5B266',
      warning100: '#D37F00',
    },
    success: {
      // success010: 'hsla(158, 60%, 42%, 0.10)',
      // success060: 'hsla(158, 60%, 42%, 0.60)',
      // success100: 'hsla(158, 60%, 42%, 1)',
      success010: '#EAF7F2',
      success060: '#80CDB1',
      success100: '#2BAB7C',
    },
    info: {
      // info010: 'hsla(208, 100%, 46%, 0.10)',
      // info060: 'hsla(208, 100%, 46%, 0.60)',
      // info100: 'hsla(208, 100%, 46%, 1)',
      info010: '#E5F2FD',
      info060: '#66B1F2',
      info100: '#007EEA',
    },
  },
};

export const lightColors = {
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
};

export const darkColors = {
  // other
  appBackground: '#222B39',
  editorBackground: '#1A212D',
};
