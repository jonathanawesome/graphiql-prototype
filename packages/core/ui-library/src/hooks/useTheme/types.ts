export type HexValue = `#${string}`;

type ThemeMode = 'LIGHT' | 'DARK';

export type ThemeStore = {
  themeMode: ThemeMode;
  themeClass: () => string;
  toggleThemeMode: ({ mode }: { mode: ThemeMode }) => void;
};
