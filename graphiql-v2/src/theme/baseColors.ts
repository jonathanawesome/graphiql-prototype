export type BaseColors = {
  scale: {
    black: string;
    800: string;
    700: string;
    600: string;
    500: string;
    400: string;
    300: string;
    200: string;
    100: string;
    white: string;
  };
  accent: {
    error: string;
    success: string;
    warning: string;
    info: string;
    field: string;
    argument: string;
  };
};

export const baseColors: BaseColors = {
  scale: {
    black: '#000000',
    800: '#3B4C6A',
    700: '#818C9F',
    600: '#B1B7C3',
    500: '#D0D5DD',
    400: '#D9DDE3',
    300: '#EAEDF1',
    200: '#F1F2F4',
    100: '#F8FAFC',
    white: '#FFFFFF',
  },
  accent: {
    error: '#F85B30',
    success: '#2BAB7C',
    warning: '#D37F00',
    info: '#007EEA',
    field: '#6E6ACF',
    argument: '#D60690',
  },
};
