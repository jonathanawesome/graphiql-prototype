import * as React from 'react';
import type { GlobalProvider } from '@ladle/react';
import { globalStyles, css } from '@graphiql-prototype/ui-library';

// hooks
import { useTheme, theme } from '@graphiql-prototype/ui-library';

// styles | this is a simple override of ladle-main styles
import './styles.css';

const StyledContainer = css({
  height: `100%`,
  width: `100%`,
  backgroundColor: theme.colors.surface1,

  variants: {
    mode: {
      preview: {
        padding: 0,
      },
      full: {
        padding: `16px`,
      },
      'single-scroll': {},
    },
  },
});

const StyledSwitch = css({
  all: 'unset',
  cursor: 'pointer',
  position: 'fixed',
  bottom: 64,
  right: 64,
});

export const Provider: GlobalProvider = ({ children, globalState }) => {
  const { themeMode, themeClass, toggleThemeMode } = useTheme();

  globalStyles();

  return (
    <div className={`${themeClass()} ${StyledContainer({ mode: globalState.mode })}`}>
      {children}
      <button
        className={StyledSwitch()}
        onClick={() => {
          if (themeMode === 'LIGHT') {
            toggleThemeMode({ mode: 'DARK' });
          }
          if (themeMode === 'DARK') {
            toggleThemeMode({ mode: 'LIGHT' });
          }
        }}
      >
        🚦
      </button>
    </div>
  );
};
