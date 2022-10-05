import type { GlobalProvider } from '@ladle/react';

import React from 'react';
import { globalStyles, styled } from '@graphiql-prototype/ui-library';

// hooks
import { useTheme, theme } from '@graphiql-prototype/ui-library';

// styles | this is a simple override of ladle-main styles
import './styles.css';

const Container = styled('div', {
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

const Switch = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  position: 'fixed',
  bottom: 64,
  right: 64,
});

export const Provider: GlobalProvider = ({ children, globalState }) => {
  const { themeMode, themeClass, toggleThemeMode } = useTheme();
  console.log('globalState', { globalState });
  globalStyles();

  return (
    <Container className={themeClass()} mode={globalState.mode}>
      {children}
      <Switch
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
      </Switch>
    </Container>
  );
};
