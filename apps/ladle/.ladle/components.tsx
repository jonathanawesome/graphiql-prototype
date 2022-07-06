import React, { useEffect } from 'react';

// hooks
import { useGraphiQLSchema } from '@graphiql-v2-prototype/graphiql-editor'

// styles
import { globalStyles } from '@graphiql-v2-prototype/graphiql-ui-library'

export const Provider = ({ children}: {children: React.ReactNode}) => {
  globalStyles();

  const { initSchema } = useGraphiQLSchema();

  useEffect(() => {
    initSchema({url: import.meta.env.MODE === "development" ? "http://localhost:4000/graphql" : undefined});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children
};

