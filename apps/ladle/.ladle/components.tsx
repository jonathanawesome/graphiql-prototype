import React, { useEffect } from 'react';
import { useGraphiQLEditor } from '@graphiql-v2-prototype/graphiql-editor'
import { globalStyles } from '@graphiql-v2-prototype/graphiql-ui-library'

export const Provider = ({ children}: {children: React.ReactNode}) => {
  globalStyles();

  const { initSchema } = useGraphiQLEditor();

  useEffect(() => {
    initSchema({});
    // initSchema({url: "https://rickandmortyapi.com/graphql"});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children
};

