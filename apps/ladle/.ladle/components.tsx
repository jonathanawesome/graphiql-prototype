import React, { useEffect, useState } from 'react';
import { globalStyles, darkTheme, styled } from '@graphiql-prototype/ui-library';

// hooks
import { useSchema } from '@graphiql-prototype/use-schema';

const themeMap = {
  light: null,
  dark: darkTheme,
};

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
  const [theme, setTheme] = useState<string>('dark');

  globalStyles();

  const { loadSchema } = useSchema();

  useEffect(() => {
    loadSchema({ init: true, url: 'GraphiQL Test Schema' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className={themeMap[theme]}>
      {children}
      <Switch
        onClick={() => {
          if (theme === 'light') {
            setTheme('dark');
          }
          if (theme === 'dark') {
            setTheme('light');
          }
        }}
      >
        🚦
      </Switch>
    </Container>
  );
};
