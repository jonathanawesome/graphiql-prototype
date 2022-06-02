import React, { useEffect } from 'react';
import { globalStyles, useGraphiQL } from '@graphiql-v2-prototype/graphiql-v2'

export const Provider = ({ children}: {children: React.ReactNode}) => {
  globalStyles();

  const {  createFetcher } = useGraphiQL();

  useEffect(() => {
    createFetcher({url: 'http://localhost:4000/graphql'});
    // initSchema({url: 'https://rickandmortyapi.com/graphql'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return children
};

