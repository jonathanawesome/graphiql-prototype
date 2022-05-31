import React, { useEffect } from 'react';
// import type { GlobalProvider } from "@ladle/react";

/** hooks */
import { useGraphiQL } from '../src/hooks/useGraphiQL'

/** theme */
import { globalStyles } from '../src/theme';


export const Provider = ({ children}: {children: React.ReactNode}) => {
  globalStyles();

  const { initSchema } = useGraphiQL();

  useEffect(() => {
    initSchema({url: 'https://api.spacex.land/graphql/'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return children
};

