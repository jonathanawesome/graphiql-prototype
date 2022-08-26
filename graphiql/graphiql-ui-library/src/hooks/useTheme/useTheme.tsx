import create from 'zustand';

// types
import { ThemeStore } from './types';

export const useTheme = create<ThemeStore>((set, get) => ({
  theme: {
    tokens: {
      colors: {
        neutral: '#3B4C6A',
        primary: '#D60690',
        secondary: '#6E6ACF',
        error: '#F85B30',
        warning: '#D37F00',
        info: '#2BAB7C',
        success: '#007EEA',
      },
    },
  },
  setColors: ({ colors }) => {
    const theme = get().theme;
    set({
      theme: {
        ...theme,
        tokens: {
          ...theme.tokens,
          colors: {
            ...theme.tokens.colors,
            ...colors,
          },
        },
      },
    });
  },
}));
