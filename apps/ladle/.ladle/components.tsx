import React from 'react';
import { styled } from '@graphiql-prototype/ui-library';

// hooks
import { useTheme } from '@graphiql-prototype/ui-library';

const Container = styled('div', {
  height: `100%`,
  width: `100%`,
});

const Switch = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  position: 'fixed',
  bottom: 64,
  right: 64,
});

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const { themeMode, themeClass, toggleThemeMode } = useTheme();

  return (
    <Container className={themeClass()}>
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
