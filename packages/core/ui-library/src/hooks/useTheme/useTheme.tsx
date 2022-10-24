import create from 'zustand';
import { editor as MONACO_EDITOR } from 'monaco-editor';

// stitches
import { theme, darkTheme } from '../../theme';

// types
import { ThemeStore } from './types';

export const useTheme = create<ThemeStore>((set, get) => ({
  themeMode: 'DARK',
  themeClass: () => {
    const themeMode = get().themeMode;
    return themeMode === 'DARK' ? darkTheme : theme;
  },
  toggleThemeMode: ({ mode }) => {
    set({ themeMode: mode });
    MONACO_EDITOR.setTheme(`graphiql-${mode}`);
  },
}));
