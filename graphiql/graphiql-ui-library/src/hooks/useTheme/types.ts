export type HexValue = `#${string}`;

export type DesignTokens = {
  colors?: {
    neutral?: HexValue;
    primary?: HexValue;
    secondary?: HexValue;
    error?: HexValue;
    warning?: HexValue;
    info?: HexValue;
    success?: HexValue;
  };
};

export type ThemeStore = {
  theme: {
    tokens: DesignTokens;
  };
  setColors: ({ colors }: { colors: DesignTokens['colors'] }) => void;
};
