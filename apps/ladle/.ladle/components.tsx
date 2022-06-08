import React, { useEffect } from 'react';
import { useGraphiQLScout } from '@graphiql-v2-prototype/graphiql-scout'
import { globalStyles } from '@graphiql-v2-prototype/graphiql-ui-library'

export const Provider = ({ children}: {children: React.ReactNode}) => {
  globalStyles();

  const { initSchema } = useGraphiQLScout();

  useEffect(() => {
    initSchema({url: "https://rickandmortyapi.com/graphql"});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children
};

