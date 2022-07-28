import React, { useEffect } from 'react';

// hooks
import { useGraphiQLSchema } from '@graphiql-prototype/graphiql-editor';

// styles
import { globalStyles } from '@graphiql-prototype/graphiql-ui-library';

export const Provider = ({ children }: { children: React.ReactNode }) => {
  globalStyles();

  const { initSchema } = useGraphiQLSchema();

  useEffect(() => {
    initSchema({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};
