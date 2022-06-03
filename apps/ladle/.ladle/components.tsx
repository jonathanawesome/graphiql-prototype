import React, { useEffect } from 'react';
import { globalStyles, useGraphiQL } from '@graphiql-v2-prototype/graphiql-v2'

export const Provider = ({ children}: {children: React.ReactNode}) => {
  globalStyles();

  const {  initSchema } = useGraphiQL();

  useEffect(() => {
    initSchema({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return children
};

